// import React from 'react';
// import { Search, User, Heart, ShoppingBag } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from "../../redux/slices/authSlice";
// import './Header.css';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector(state => state.auth);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <header className="header-container">
//       <nav className="navbar">
//         <div className="nav-container">
//           <div className="nav-left">
//             <a href="/" className="brand-logo">
//               <img src="/assets/urbn.jpg" alt="Logo" />
//             </a>

//             <ul className="nav-categories">
//               <li><a href="/">HOME</a></li>
//               <li><a href="/shop">SHOP</a></li>
//               <li><a href="/about">ABOUT</a></li>
//               <li><a href="/contact">CONTACT</a></li>
//               <li>
//                 <a href="/studio">
//                   2025
//                   <span className="new-tag">NEW</span>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div className="search-container">
//             <Search className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search for products, brands and more"
//               className="search-input"
//             />
//           </div>

//           <div className="nav-actions">
//             <div className="nav-item">
//               {isAuthenticated ? (
//                 <div className="profile-dropdown">
//                   <a href="/profile" className="nav-link">
//                     <User />
//                     <span>{user?.firstName || 'Profile'}</span>
//                   </a>
//                   <div className="dropdown-content">
//                     <div className="dropdown-header">
//                       <p>Welcome, {user?.firstName}!</p>
//                       <p className="dropdown-subtext">Manage your account and orders</p>
//                     </div>
//                     <div className="dropdown-buttons">
//                       <button onClick={handleLogout} className="auth-button">
//                         LOGOUT
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="profile-dropdown">
//                   <a href="/login" className="nav-link">
//                     <User />
//                     <span>Profile</span>
//                   </a>
//                   <div className="dropdown-content">
//                     <div className="dropdown-header">
//                       <p>Welcome</p>
//                       <p className="dropdown-subtext">To access account and manage orders</p>
//                     </div>
//                     <div className="dropdown-buttons">
//                       <a href="/login" className="auth-button">
//                         LOGIN / SIGNUP
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="nav-item">
//               <a href="/wishlist" className="nav-link">
//                 <Heart />
//                 <span>Wishlist</span>
//               </a>
//             </div>
//             <div className="nav-item">
//               <a href="/bag" className="nav-link">
//                 <ShoppingBag />
//                 <span>Bag</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;


// import React, { useEffect } from 'react';
// import { Search, User, Heart, ShoppingBag } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // import { logout } from "../../redux/slices/authSlice";
// import { adminLogout as logout } from '../../redux/slices/authSlice';
// import axios from 'axios'; // Make sure axios is installed
// import './Header.css';

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isAuthenticated } = useSelector(state => state.auth);

//   // Handle logout with HTTP-only cookie
//   const handleLogout = async () => {
//     try {
//       // Make a request to your backend logout endpoint
//       await axios.post('/api/auth/logout', {}, {
//         withCredentials: true // Important for cookies
//       });
      
//       dispatch(logout());
//       navigate('/');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <header className="header-container">
//       <nav className="navbar">
//         <div className="nav-container">
//           <div className="nav-left">
//             <a href="/" className="brand-logo">
//               <img src="/assets/urbn.jpg" alt="Logo" />
//             </a>

//             <ul className="nav-categories">
//               <li><a href="/">HOME</a></li>
//               <li><a href="/shop">SHOP</a></li>
//               <li><a href="/about">ABOUT</a></li>
//               <li><a href="/contact">CONTACT</a></li>
//               <li>
//                 <a href="/studio">
//                   2025
//                   <span className="new-tag">NEW</span>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div className="search-container">
//             <Search className="search-icon" />
//             <input
//               type="text"
//               placeholder="Search for products, brands and more"
//               className="search-input"
//             />
//           </div>

//           <div className="nav-actions">
//             <div className="nav-item">
//               {isAuthenticated ? (
//                 <div className="profile-dropdown">
//                   <a href="/profile" className="nav-link">
//                     <User />
//                     <span>{user?.firstName || 'Profile'}</span>
//                   </a>
//                   <div className="dropdown-content">
//                     <div className="dropdown-header">
//                       <p>Welcome, {user?.firstName}!</p>
//                       <p className="dropdown-subtext">Manage your account and orders</p>
//                     </div>
//                     <div className="dropdown-buttons">
//                       <button 
//                         onClick={handleLogout} 
//                         className="auth-button"
//                       >
//                         LOGOUT
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="profile-dropdown">
//                   <a href="/login" className="nav-link">
//                     <User />
//                     <span>Profile</span>
//                   </a>
//                   <div className="dropdown-content">
//                     <div className="dropdown-header">
//                       <p>Welcome</p>
//                       <p className="dropdown-subtext">To access account and manage orders</p>
//                     </div>
//                     <div className="dropdown-buttons">
//                       <a href="/login" className="auth-button">
//                         LOGIN / SIGNUP
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="nav-item">
//               <a href="/wishlist" className="nav-link">
//                 <Heart />
//                 <span>Wishlist</span>
//               </a>
//             </div>
//             <div className="nav-item">
//               <a href="/bag" className="nav-link">
//                 <ShoppingBag />
//                 <span>Bag</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { Search, User, Heart, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout, adminLogout } from '../../redux/slices/authSlice';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get both user and admin auth states
  const { user: userAuth, isAuthenticated: userAuthenticated } = useSelector(state => state.userAuth);
  const { user: adminAuth, isAuthenticated: adminAuthenticated } = useSelector(state => state.adminAuth);

  // Determine which auth state to use
  const isAuthenticated = userAuthenticated || adminAuthenticated;
  const user = userAuth || adminAuth;

  // Handle logout with HTTP-only cookie
  const handleLogout = async () => {
    try {
      // Determine which logout endpoint to hit based on user type
      const logoutEndpoint = user?.role === 'admin' 
        ? '/api/admin/logout'
        : '/api/auth/logout';

      await axios.post(logoutEndpoint, {}, {
        withCredentials: true
      });
      
      // Dispatch appropriate logout action
      if (user?.role === 'admin') {
        dispatch(adminLogout());
      } else {
        dispatch(userLogout());
      }
      
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <a href="/" className="brand-logo">
              <img src="/assets/urbn.jpg" alt="Logo" />
            </a>

            <ul className="nav-categories">
              <li><a href="/">HOME</a></li>
              <li><a href="/shop">SHOP</a></li>
              <li><a href="/about">ABOUT</a></li>
              <li><a href="/contact">CONTACT</a></li>
              <li>
                <a href="/studio">
                  2025
                  <span className="new-tag">NEW</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="search-input"
            />
          </div>

          <div className="nav-actions">
            <div className="nav-item">
              {isAuthenticated ? (
                <div className="profile-dropdown">
                  <a href="/profile" className="nav-link">
                    <User />
                    <span>{user?.firstName || 'Profile'}</span>
                  </a>
                  <div className="dropdown-content">
                    <div className="dropdown-header">
                      <p>Welcome, {user?.firstName}!</p>
                      <p className="dropdown-subtext">
                        {user?.role === 'admin' ? 'Admin Dashboard' : 'Manage your account and orders'}
                      </p>
                    </div>
                    <div className="dropdown-buttons">
                      <button 
                        onClick={handleLogout} 
                        className="auth-button"
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-dropdown">
                  <a href="/login" className="nav-link">
                    <User />
                    <span>Profile</span>
                  </a>
                  <div className="dropdown-content">
                    <div className="dropdown-header">
                      <p>Welcome</p>
                      <p className="dropdown-subtext">To access account and manage orders</p>
                    </div>
                    <div className="dropdown-buttons">
                      <a href="/login" className="auth-button">
                        LOGIN / SIGNUP
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="nav-item">
              <a href="/wishlist" className="nav-link">
                <Heart />
                <span>Wishlist</span>
              </a>
            </div>
            <div className="nav-item">
              <a href="/bag" className="nav-link">
                <ShoppingBag />
                <span>Bag</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;