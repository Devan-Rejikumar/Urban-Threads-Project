// import React, { Fragment } from 'react';
// import { Link, Outlet } from 'react-router-dom'; // Import Outlet
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   return (
//     <Fragment>
//       <h1 className='heading'>Admin Dashboard</h1>
//      <div className="admin-dashboard">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <nav>
//             <ul>
//               <li>
//                 <Link to="products" className="sidebar-link">Product</Link>
//               </li>
//               <li>
//                 <Link to="categories" className="sidebar-link">Category</Link>
//               </li>
//               <li>
//                 <Link to="users" className="sidebar-link">User Listing</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Main Content Area */}
//         <div className="main-content">
//           <Outlet /> {/* This is where nested routes will render */}

//         </div>
//       </div>
//     </Fragment>

//   );
// };

// export default AdminDashboard;
import React, { Fragment } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { logout } from '../../../redux/slices/authSlice';
import { adminLogout as logout } from '../../../redux/slices/authSlice';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    
    // Navigate to login page
    navigate('/admin-login', { replace: true });
  };

  return (
    <Fragment>
      <div className='heading'>
        <h1 className='heading-title'>Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
      <div className="admin-dashboard">
        <div className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="products" className="sidebar-link">Product</Link>
              </li>
              <li>
                <Link to="categories" className="sidebar-link">Category</Link>
              </li>
              <li>
                <Link to="users" className="sidebar-link">User Listing</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
  
};

export default AdminDashboard;