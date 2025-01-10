import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLoginStart, adminLoginSuccess, adminLoginFailure } from '../../redux/slices/authSlice'
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    dispatch(adminLoginStart());

    try {
      const response = await axios.post('http://localhost:5000/api/admin/adminLogin', {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Store admin data in Redux
        dispatch(adminLoginSuccess({
          id: response.data.admin.id,
          name: response.data.admin.name,
          email: response.data.admin.email,
          role: 'admin'
        }));

        // Optional: Store minimal admin data in localStorage
        localStorage.setItem('adminData', JSON.stringify({
          name: response.data.admin.name,
          email: response.data.admin.email,
          role: 'admin'
        }));

        // Navigate after successful dispatch
        navigate('/admin-dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login.';
      dispatch(adminLoginFailure(errorMessage));
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="background-dot"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}
      
      <div className="login-card">
        <div className="card-header">
          <div className="logo">R</div>
          <h1>Admin Sign In</h1>
          <p>Sign in and start managing your candidates!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="button" className="forgot-password">
              Forgot password?
            </button>
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/adminLogin', {
//         email,
//         password,
//       }, {
//         withCredentials: true, // Important for receiving cookies
//       });

//       if (response.status === 200) {
//         // No need to store token in localStorage anymore
//         // Just store minimal admin data for UI purposes
//         localStorage.setItem('adminData', JSON.stringify({
//           name: response.data.admin.name,
//           email: response.data.admin.email,
//           role: 'admin'
//         }));
        
//         navigate('/admin-dashboard');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       if (error.response) {
//         setError(error.response.data.message || 'An error occurred during login.');
//       } else if (error.request) {
//         setError('No response received from the server. Please try again.');
//       } else {
//         setError('Error setting up the request. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       {/* Animated background dots */}
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="background-dot"
//           style={{
//             width: `${Math.random() * 6 + 2}px`,
//             height: `${Math.random() * 6 + 2}px`,
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDuration: `${Math.random() * 10 + 10}s`
//           }}
//         />
//       ))}
      
//       <div className="login-card">
//         <div className="card-header">
//           <div className="logo">R</div>
//           <h1>Admin Sign In</h1>
//           <p>Sign in and start managing your candidates!</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your password"
//             />
//           </div>
          
//           {error && <div className="error-message">{error}</div>}
          
//           <div className="form-options">
//             <div className="remember-me">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember me</label>
//             </div>
//             <button type="button" className="forgot-password">
//               Forgot password?
//             </button>
//           </div>
          
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;




// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Dispatch login start
//     dispatch(loginStart());

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/adminLogin', {
//         email,
//         password,
//       }, {
//         withCredentials: true,
//       });

//       console.log('Full response:', response);
//       console.log('Response data:', response.data);
//       console.log('User data:', response.data.user);
//       console.log('Role:', response.data.user?.role);

//       if (response.status === 200) {
//         // Dispatch login success with the user data
//         dispatch(loginSuccess(response.data));

//         // Store token if your backend sends one
//         if (response.data.token) {
//           localStorage.setItem('token', response.data.token);
//           // Set default authorization header for future requests
//           axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//         }

//         // Navigate to dashboard after successful login
//         navigate('/admin-dashboard', { replace: true });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
      
//       // Handle error and dispatch login failure
//       const errorMessage = error.response?.data?.message || 'An error occurred during login.';
//       dispatch(loginFailure(errorMessage));
//       setError(errorMessage);
//     }
//   };


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loginStart, loginSuccess, loginFailure } from '../../redux/slices/authSlice';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     dispatch(loginStart());
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/adminLogin', {
//         email,
//         password,
//       }, {
//         withCredentials: true,
//       });
  
//       const { token, admin } = response.data;
  
//       // Store token
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(admin));
      
//       // Set axios default header
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Update Redux store
//       dispatch(loginSuccess(admin));
  
//       // Get return URL from query params or default to dashboard
//       const searchParams = new URLSearchParams(location.search);
//       const returnUrl = searchParams.get('returnUrl') || '/admin-dashboard';
//       navigate(returnUrl, { replace: true });
//     } catch (error) {
//       console.error('Login error:', error);
//       const errorMessage = error.response?.data?.message || 'An error occurred during login.';
//       dispatch(loginFailure(errorMessage));
//       setError(errorMessage);
//     }
//   };
//   return (
//     <div className="login-container">
//       {/* Animated background dots */}
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="background-dot"
//           style={{
//             width: `${Math.random() * 6 + 2}px`,
//             height: `${Math.random() * 6 + 2}px`,
//             top: `${Math.random() * 100}%`,
//             left: `${Math.random() * 100}%`,
//             animationDuration: `${Math.random() * 10 + 10}s`
//           }}
//         />
//       ))}
      
//       <div className="login-card">
//         <div className="card-header">
//           <div className="logo">
//             R
//           </div>
//           <h1>Admin Sign In</h1>
//           <p>Sign in and start managing your candidates!</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your password"
//             />
//           </div>
          
//           {error && <div className="error-message">{error}</div>}
          
//           <div className="form-options">
//             <div className="remember-me">
//               <input type="checkbox" id="remember" />
//               <label htmlFor="remember">Remember me</label>
//             </div>
//             <button type="button" className="forgot-password">
//               Forgot password?
//             </button>
//           </div>
          
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;