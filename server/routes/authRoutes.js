
import express from 'express';
import { registerUser, loginUser, verifyOTP, resendOTP, handleGoogleSignup, verifyStatus, logout} from '../controllers/user/authController.js';
import passport from 'passport';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Login and Register Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/verify-status', verifyStatus);
router.post('/google-signup',handleGoogleSignup)

router.get('/verify-status', verifyToken, verifyStatus);

router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/logout', logout)

// Google Authentication routes
router.get("/google",
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);



export default router;

