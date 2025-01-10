// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import './Auth.css';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// // import { loginSuccess, logout } from '../redux/slices/authSlice';
// import { userLoginSuccess as loginSuccess, userLogout as logout } from '../redux/slices/authSlice';

// axios.defaults.withCredentials = true;

// const OTPVerification = ({ email, registrationId, onVerificationSuccess, onBackToSignup }) => {
//     const [otp, setOtp] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [resendLoading, setResendLoading] = useState(false);
//     const [timer, setTimer] = useState(30);

//     useEffect(() => {
//         let interval = null;
//         if (timer > 0) {
//             interval = setInterval(() => {
//                 setTimer((prevTimer) => prevTimer - 1);
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [timer]);

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
//                 registrationId,
//                 otp
//             });
//             if (response.status === 200) {
//                 toast.success('OTP Verified Succesfully !')
//                 onVerificationSuccess(response.data)
//             }
//         } catch (error) {
//             console.error('Full error details:', error);
//             toast.error(error.response?.data?.message || 
//                        `Error: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResendOTP = async () => {
//         setResendLoading(true);
//         try {
//             await axios.post('http://localhost:5000/api/auth/resend-otp', {
//                 registrationId
//             });
//             setTimer(30);
//             toast.success('OTP resent successfully');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to resend OTP');
//         } finally {
//             setResendLoading(false);
//         }
//     };

//     return (
//         <div className="otp-verification">
//             <h3>Enter OTP</h3>
//             <p>Please enter the OTP sent to {email}</p>
//             <form onSubmit={handleOtpSubmit}>
//                 <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter OTP"
//                     maxLength={6}
//                     required
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Verifying...' : 'Verify OTP'}
//                 </button>
//             </form>
//             <div className="resend-otp">
//                 {timer > 0 ? (
//                     <p>Resend OTP in {timer} seconds</p>
//                 ) : (
//                     <button
//                         onClick={handleResendOTP}
//                         disabled={resendLoading}
//                         className="resend-button"
//                     >
//                         {resendLoading ? 'Resending...' : 'Resend OTP'}
//                     </button>
//                 )}
//             </div>
//             <button onClick={onBackToSignup} className="back-button">
//                 Back to Sign Up
//             </button>
//         </div>
//     );
// };

// const AuthForm = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         phone: '',
//     });

//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isSignUp, setIsSignUp] = useState(true);
//     const [showOTP, setShowOTP] = useState(false);
//     const [registrationId, setRegistrationId] = useState(null);

//     const { firstName, lastName, email, password, confirmPassword, phone } = formData;

//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/auth/verify-status');
//                 if (response.data.isAuthenticated) {
//                     dispatch(loginSuccess(response.data.user));
//                     navigate('/');

//                 }
//             } catch (error) {
//                 console.log('User not authenticated');
//             }
//         };

//         checkAuthStatus();
//     }, [dispatch, navigate]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleVerificationSuccess = async (userData) => {
//         try {
//             dispatch(loginSuccess(userData.user));
//             toast.success('Registration Successful', {
//                 onClose : () =>{
//                     navigate('/')
//                 }
//             });
//             // navigate('/');
//         } catch (error) {
//             toast.error('Failed to complete registration');
//             console.error('Verification error:', error);
//         }
//     };


//     const resetForm = () => {
//         setFormData({
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             phone: '',
//         });
//         setError('');
//         setSuccess('');
//         setShowOTP(false);
//     };

//     const handleBackToSignup = () => {
//         setShowOTP(false);
//         setError('');
//         setSuccess('');
//     };

//     const handleGoogleSignUp = async (userDetails) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/google-signup', { userDetails });
//             if (response.status === 201 || response.status === 200) {
//                 dispatch(loginSuccess(response.data.user));
//                 toast.success(response.data.message || 'Google Sign Up successful!');
//                 navigate('/');
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'An error occurred during Google Sign Up.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');
//         setLoading(true);

//         if (isSignUp) {
//             if (password !== confirmPassword) {
//                 toast.error('Passwords do not match!');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const registrationData = {
//                     firstName,
//                     lastName,
//                     email,
//                     password,
//                     phone
//                 };

//                 const response = await axios.post('http://localhost:5000/api/auth/register', registrationData);

//                 if (response.data.registrationId) {
//                     setRegistrationId(response.data.registrationId);
//                     toast.success('OTP sent to your email!');
//                     setShowOTP(true);
//                 }
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'An error occurred during registration.');
//             }
//         } else {
//             try {
//                 const response = await axios.post('http://localhost:5000/api/auth/login', {
//                     email,
//                     password
//                 });

//                 if (response.status === 200) {
//                     if (response.data.user.status === 'blocked') {
//                         toast.error('Your account has been blocked. Please contact support for assistance');
//                         return;
//                     }
//                     dispatch(loginSuccess(response.data.user));
//                     toast.success('Login successful!');
//                     navigate('/');
//                 }
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Login failed');
//             }
//         }
//         setLoading(false);
//     };

//     const handleLogout = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/auth/logout');
//             dispatch(logout());
//             navigate('/auth');
//         } catch (error) {
//             toast.error('Error logging out');
//         }
//     };

//     return (
//         <div className="auth-container">
//             <ToastContainer />
//             <div className="auth-content">
//                 <h1 className="brand-title">Urban Threads</h1>
//                 <div className="form-wrapper">
//                     <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

//                     {isSignUp && showOTP ? (
//                         <OTPVerification
//                             email={email}
//                             registrationId={registrationId}
//                             onVerificationSuccess={handleVerificationSuccess}
//                             onBackToSignup={handleBackToSignup}
//                         />
//                     ) : (
//                         <>
//                             <form onSubmit={handleSubmit}>
//                                 {isSignUp && (
//                                     <>
//                                         <input
//                                             type="text"
//                                             name="firstName"
//                                             placeholder="First Name"
//                                             value={firstName}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         <input
//                                             type="text"
//                                             name="lastName"
//                                             placeholder="Last Name"
//                                             value={lastName}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                         <input
//                                             type="tel"
//                                             name="phone"
//                                             placeholder="Phone"
//                                             value={phone}
//                                             onChange={handleChange}
//                                             required
//                                         />
//                                     </>
//                                 )}
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     placeholder="Email"
//                                     value={email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 {isSignUp && (
//                                     <input
//                                         type="password"
//                                         name="confirmPassword"
//                                         placeholder="Confirm Password"
//                                         value={confirmPassword}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 )}
//                                 <button type="submit" className="auth-button" disabled={loading}>
//                                     {loading ? 'Processing...' : (isSignUp ? 'Register' : 'Login')}
//                                 </button>
//                             </form>

//                             <div className="social-login">
//                                 <p>Or sign up using:</p>
//                                 <GoogleLogin
//                                     onSuccess={credentialResponse => {
//                                         const decoded = jwtDecode(credentialResponse.credential);
//                                         if (decoded.name && decoded.email && decoded.sub && decoded.given_name && decoded.family_name) {
//                                             const userDetails = {
//                                                 email: decoded.email,
//                                                 firstName: decoded.given_name,
//                                                 lastName: decoded.family_name,
//                                                 googleId: decoded.sub
//                                             };
//                                             handleGoogleSignUp(userDetails);
//                                         }
//                                     }}
//                                     onError={() => {
//                                         toast.error('Google Login Failed');
//                                     }}
//                                 />
//                             </div>

//                             <div className="toggle-form">
//                                 <p>
//                                     {isSignUp
//                                         ? 'Already have an account? '
//                                         : "Don't have an account? "}
//                                     <span
//                                         className="toggle-link"
//                                         onClick={() => {
//                                             setIsSignUp(!isSignUp);
//                                             resetForm();
//                                         }}
//                                     >
//                                         {isSignUp ? 'Login here' : 'Sign Up here'}
//                                     </span>
//                                 </p>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthForm;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { userLoginSuccess as loginSuccess, userLogout as logout } from '../redux/slices/authSlice';
import './Auth.css';
// Validation Schemas
const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[^\w]/, 'Password must contain at least one symbol')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const OTPVerification = ({ email, registrationId, onVerificationSuccess, onBackToSignup }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
                registrationId,
                otp
            });
            if (response.status === 200) {
                toast.success('OTP Verified Succesfully !')
                onVerificationSuccess(response.data)
            }
        } catch (error) {
            console.error('Full error details:', error);
            toast.error(error.response?.data?.message || 
                       `Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/resend-otp', {
                registrationId
            });
            setTimer(30);
            toast.success('OTP resent successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="otp-verification">
            <h3>Enter OTP</h3>
            <p>Please enter the OTP sent to {email}</p>
            <form onSubmit={handleOtpSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>
            <div className="resend-otp">
                {timer > 0 ? (
                    <p>Resend OTP in {timer} seconds</p>
                ) : (
                    <button
                        onClick={handleResendOTP}
                        disabled={resendLoading}
                        className="resend-button"
                    >
                        {resendLoading ? 'Resending...' : 'Resend OTP'}
                    </button>
                )}
            </div>
            <button onClick={onBackToSignup} className="back-button">
                Back to Sign Up
            </button>
        </div>
    );
};

const AuthForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [registrationId, setRegistrationId] = useState(null);
    const [verificationEmail, setVerificationEmail] = useState('');

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/verify-status');
                if (response.data.isAuthenticated) {
                    dispatch(loginSuccess(response.data.user));
                    navigate('/');
                }
            } catch (error) {
                console.log('User not authenticated');
            }
        };

        checkAuthStatus();
    }, [dispatch, navigate]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            if (isSignUp) {
                const response = await axios.post('http://localhost:5000/api/auth/register', values);
                if (response.data.registrationId) {
                    setRegistrationId(response.data.registrationId);
                    setVerificationEmail(values.email);
                    toast.success('OTP sent to your email!');
                    setShowOTP(true);
                }
            } else {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: values.email,
                    password: values.password
                });

                if (response.status === 200) {
                    if (response.data.user.status === 'blocked') {
                        toast.error('Your account has been blocked. Please contact support for assistance');
                        return;
                    }
                    dispatch(loginSuccess(response.data.user));
                    toast.success('Login successful!');
                    navigate('/');
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleSignUp = async (userDetails) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/google-signup', { userDetails });
            if (response.status === 201 || response.status === 200) {
                dispatch(loginSuccess(response.data.user));
                toast.success(response.data.message || 'Google Sign Up successful!');
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred during Google Sign Up.');
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            <div className="auth-content">
                <h1 className="brand-title">Urban Threads</h1>
                <div className="form-wrapper">
                    <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>

                    {isSignUp && showOTP ? (
                        <OTPVerification
                            email={verificationEmail}
                            registrationId={registrationId}
                            onVerificationSuccess={(userData) => {
                                dispatch(loginSuccess(userData.user));
                                toast.success('Registration Successful');
                                navigate('/');
                            }}
                            onBackToSignup={() => setShowOTP(false)}
                        />
                    ) : (
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                                phone: '',
                            }}
                            validationSchema={isSignUp ? signupSchema : loginSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {isSignUp && (
                                        <>
                                            <div className="form-group">
                                                <Field type="text" name="firstName" placeholder="First Name" />
                                                <ErrorMessage name="firstName" component="div" className="error-message" />
                                            </div>

                                            <div className="form-group">
                                                <Field type="text" name="lastName" placeholder="Last Name" />
                                                <ErrorMessage name="lastName" component="div" className="error-message" />
                                            </div>

                                            <div className="form-group">
                                                <Field type="tel" name="phone" placeholder="Phone" />
                                                <ErrorMessage name="phone" component="div" className="error-message" />
                                            </div>
                                        </>
                                    )}

                                    <div className="form-group">
                                        <Field type="email" name="email" placeholder="Email" />
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <Field type="password" name="password" placeholder="Password" />
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                    </div>

                                    {isSignUp && (
                                        <div className="form-group">
                                            <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                        </div>
                                    )}

                                    <button type="submit" className="auth-button" disabled={isSubmitting}>
                                        {isSubmitting ? 'Processing...' : (isSignUp ? 'Register' : 'Login')}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    )}

                    <div className="social-login">
                        <p>Or sign up using:</p>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const decoded = jwtDecode(credentialResponse.credential);
                                if (decoded.name && decoded.email && decoded.sub && decoded.given_name && decoded.family_name) {
                                    handleGoogleSignUp({
                                        email: decoded.email,
                                        firstName: decoded.given_name,
                                        lastName: decoded.family_name,
                                        googleId: decoded.sub
                                    });
                                }
                            }}
                            onError={() => {
                                toast.error('Google Login Failed');
                            }}
                        />
                    </div>

                    <div className="toggle-form">
                        <p>
                            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            <span
                                className="toggle-link"
                                onClick={() => setIsSignUp(!isSignUp)}
                            >
                                {isSignUp ? 'Login here' : 'Sign Up here'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;