import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;


const createTransporter = async () => {
    try {
        console.log('Setting up email transporter with user:', process.env.EMAIL_USER);

        // Create test account for development if no credentials
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
            console.log('No email credentials found, creating test account...');
            const testAccount = await nodemailer.createTestAccount();

            return nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                }
            });
        }

        // Production Gmail configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            debug: true, // Enable debug logging
            logger: true  // Enable built-in logger
        });

        console.log('Verifying transporter configuration...');
        await transporter.verify();
        console.log('Transporter verified successfully');
        return transporter;
    } catch (error) {
        console.error('Email transporter configuration error:', error);
        throw new Error(`Failed to configure email transport: ${error.message}`);
    }
};






const sendVerificationEmail = async (email, otp) => {
    try {
        console.log('Attempting to send verification email to:', email);
        const transporter = await createTransporter();

        const mailOptions = {
            from: `"Account Verification" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification OTP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333; text-align: center;">Email Verification</h1>
                    <p style="font-size: 16px;">Your OTP for email verification is:</p>
                    <h2 style="text-align: center; color: #4CAF50; letter-spacing: 5px; padding: 10px; background: #f5f5f5; border-radius: 5px;">${otp}</h2>
                    <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes</p>
                    <p style="color: #999; font-size: 12px;">If you didn't request this verification, please ignore this email.</p>
                </div>
            `
        };

        console.log('Sending mail with options:', {
            to: mailOptions.to,
            subject: mailOptions.subject,
            from: mailOptions.from
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);

        // If using ethereal email in development, log preview URL
        if (info.previewUrl) {
            console.log('Preview URL:', info.previewUrl);
        }

        return true;
    } catch (error) {
        console.error('Detailed email sending error:', {
            error: error.message,
            stack: error.stack,
            code: error.code,
            command: error.command
        });
        return false;
    }
};



const pendingRegistrations = new Map();

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        console.log('Received registration data:', {
            firstName,
            lastName,
            email,
            phone,
            passwordLength: password ? password.length : 0
        });

        // Validation checks
        const validationErrors = {
            firstName: !firstName && 'First name is required',
            lastName: !lastName && 'Last name is required',
            email: !email ? 'Email is required' :
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 'Invalid email format',
            password: !password ? 'Password is required' :
                password.length < 6 && 'Password must be at least 6 characters long',
            phone: !phone && 'Phone number is required'
        };

        const errors = Object.entries(validationErrors)
            .filter(([_, value]) => value)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store registration data temporarily with OTP
        const registrationId = crypto.randomUUID(); // Generate unique ID
        pendingRegistrations.set(registrationId, {
            userData: {
                firstName,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword,
                phone,
                status: 'active'
            },
            otp,
            otpExpiry
        });

        // Set cleanup timeout (10 minutes)
        setTimeout(() => {
            pendingRegistrations.delete(registrationId);
        }, 10 * 60 * 1000);

        // Send verification email
        const emailSent = await sendVerificationEmail(email, otp);

        if (!emailSent) {
            pendingRegistrations.delete(registrationId);
            return res.status(500).json({
                message: 'Failed to send verification email. Please try again.'
            });
        }

        res.status(201).json({
            message: 'Please verify your email to complete registration.',
            registrationId,
            requiresVerification: true
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyOTP = async (req, res) => {
    console.log('Received OTP verification request:', req.body);
    try {
        const { registrationId, otp } = req.body;
        console.log(registrationId, otp)

        // Get pending registration data
        const registrationData = pendingRegistrations.get(registrationId);
        console.log('Registration data retrieved:', registrationData);

        if (!registrationData) {
            console.log(2)
            return res.status(404).json({
                message: 'Registration session expired or not found. Please register again.'
            });
        }

        // Verify OTP
        if (String(registrationData.otp) !== String(otp)) {
            console.log(3)
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if OTP is expired
        if (new Date() > registrationData.otpExpiry) {
            console.log(4)
            pendingRegistrations.delete(registrationId);
            return res.status(400).json({ message: 'OTP expired. Please register again.' });
        }

        // Create and save user
        const newUser = new User({
            ...registrationData.userData,
            googleId: undefined,
            isVerified: true
        });

        await newUser.save();




        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log(5)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/'
        });

        pendingRegistrations.delete(registrationId);

        return res.status(200).json({
            
            message: 'Registration completed successfully',
            
            // token,
            user: {
                id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                status: newUser.status
            }
        });

        console.log(7)
    } catch (error) {
        console.error('Detailed OTP verification error:', error.message);
        console.error('Full error stack:', error.stack);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};




const resendOTP = async (req, res) => {
    try {
        const { registrationId } = req.body;

        const registrationData = pendingRegistrations.get(registrationId);
        if (!registrationData) {
            return res.status(404).json({ message: 'Registration session not found' });
        }



        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        registrationData.otp = otp;
        registrationData.otpExpiry = otpExpiry;
        pendingRegistrations.set(registrationId, registrationData);



        const emailSent = await sendVerificationEmail(registrationData.userData.email, otp);
        console.log(otp);


        if (!emailSent) {
            return res.status(500).json({
                message: 'Failed to send OTP email. Please try again later.',
                success: false
            });
        }

        res.status(200).json({
            message: emailSent
                ? 'New OTP sent successfully'
                : 'Failed to send OTP. Please try again later.',
            success: emailSent
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: 'Email not verified. Please verify your email first.',
                requiresVerification: true,
                userId: user._id
            });
        }

        if (user.status === 'blocked') {
            return res.status(403).json({
                message: "Your account has been blocked. Please contact support for assistance."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
            path: '/'
        });


        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                status: user.status
            }
        });


    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const googleCallback = (req, res) => {
    passport.authenticate('google', { session: false }, async (err, user, info) => {
        try {
            if (err) {
                console.error('Google authentication error:', err);
                return res.redirect(`${process.env.FRONTEND_URL}/?error=${encodeURIComponent('Authentication failed')}`);
            }

            if (!user) {
                return res.redirect(`${process.env.FRONTEND_URL}/?error=${encodeURIComponent('User not found')}`);
            }

            if (user.status === 'blocked') {
                return res.redirect(`${process.env.FRONTEND_URL}/?error=${encodeURIComponent('Account blocked')}`);
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
        } catch (error) {
            console.error('Callback processing error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/?error=${encodeURIComponent('Server error')}`);
        }
    })(req, res);
};


const handleGoogleSignup = async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, userName, email, googleId } = req.body.userDetails;

        const isExist = await User.findOne({ email });
        if (isExist) {
            const token = await jwt.sign({ _id: isExist._id }, secretKey, {
                expiresIn: "30d",
            });
            res.cookie("user_token", token, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: false,
                sameSite: "lax",
            });
            return res.status(200).json(googleId);
        }

        await User.create({
            firstName,
            lastName,

            email,
            googleId,
        });

        const token = await jwt.sign({ _id: googleId }, secretKey, {
            expiresIn: "30d",
        });
        res.cookie("user_token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: false, // Set to true in production with HTTPS
            sameSite: "lax",
        });
        return res.status(201).json({
            message: "user created successfully",
            id: req.body.googleId,
        });
    } catch (error) {
        console.log("googlesignup", error);
        res.status(500).json('internal server')
    }
};

const verifyStatus = async (req, res) => {
    try {
        // Get the token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                isAuthenticated: false,
                message: 'No token found'
            });
        }

        // Verify the token and get user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                isAuthenticated: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            isAuthenticated: true,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                status: user.status
                // add other needed user fields
            }
        });
    } catch (error) {
        console.error('Verify status error:', error);
        return res.status(401).json({
            isAuthenticated: false,
            message: 'Invalid or expired token'
        });
    }
};


const logout = async (req, res) => {
    try {
        // Clear the authentication token cookie
        res.cookie('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0),
            path: '/'
        });

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Error during logout' });
    }
};
export { registerUser, loginUser, googleCallback, verifyOTP, resendOTP, handleGoogleSignup, verifyStatus, logout };

