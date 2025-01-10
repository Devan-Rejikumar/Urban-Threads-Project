// import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const UserRoute = ({ children }) => {
//   const { isAuthenticated, user } = useSelector(state => state.auth);
//   const location = useLocation();

//   if (!isAuthenticated) {

//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (user?.role === 'admin') {

//     return <Navigate to="/admin-dashboard" replace />;
//   }

//   return children;
// };




// const AdminRoute = ({ children }) => {
//   const { isAuthenticated, user } = useSelector(state => state.auth);
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/admin-login" state={{ from: location }} replace />;
//   }

//   if (user?.role !== 'admin') {

//     return <Navigate to="/" replace />;
//   }

//   return children;
// };




// const PublicRoute = ({ children }) => {
//   const { isAuthenticated, user } = useSelector(state => state.auth);

//   if (isAuthenticated) {
//     if (user?.role === 'admin') {
//       return <Navigate to="/admin-dashboard" replace />;
//     }
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export { UserRoute, AdminRoute, PublicRoute };

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children }) => {
  // Get user-specific auth state
  const { isAuthenticated: userAuthenticated } = useSelector(state => state.userAuth);
  const location = useLocation();

  if (!userAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  // Get admin-specific auth state
  const { isAuthenticated: adminAuthenticated } = useSelector(state => state.adminAuth);
  const location = useLocation();

  if (!adminAuthenticated) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated: userAuthenticated } = useSelector(state => state.userAuth);
  const currentPath = useLocation().pathname;

  // Only check user authentication for user-related public routes
  if (currentPath === '/login' || currentPath === '/register' || currentPath === '/verify-otp') {
    if (userAuthenticated) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export { UserRoute, AdminRoute, PublicRoute };