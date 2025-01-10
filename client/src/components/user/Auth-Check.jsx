import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";  
import { loginSuccess } from "../../redux/slices/authSlice";

const AuthCheck = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // The cookies will be automatically sent with the request
                // because of withCredentials: true
                const response = await axios.get('http://localhost:5000/api/auth/verify-status', {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.data.isAuthenticated && response.data.user) {
                    dispatch(loginSuccess(response.data.user));
                }
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Verification error:', error.response?.data || error.message);
                }
            }
        };
        
        checkAuthStatus();
    }, [dispatch]);

    return children;
};

export default AuthCheck;