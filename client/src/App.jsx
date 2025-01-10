// // import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import AdminLogin from './components/admin/AdminLogin.jsx';
// import AuthForm from '../src/components/AuthForm.jsx';
// import AdminDashboard from './pages/admin/Dashboard/AdminDashboard.jsx';
// import ProtectedRoutes from './components/ProtectedRoutes.jsx';
// import UserListing from './pages/admin/UserManagement/UserListing.jsx';
// import Product from './components/admin/Product.jsx';
// import Category from './components/admin/category/Category.jsx';
// import AddCategory from "./pages/admin/Category-Management/Add-Category.jsx";
// import EditCategory from "./pages/admin/Category-Management/Edit-Category.jsx";
// import Home from './pages/user/home.jsx';
// import CategoryProducts from './pages/user/CategoryProducts.jsx';
// import ProductDetail from './pages/user/ProductDetails.jsx';
// import OTPVerification from './components/user/otp.jsx';
// import GoogleCallback from './components/user/GoogleAuth.jsx';
// import AuthCheck from './components/user/Auth-Check.jsx';

// function App() {
//   // Get auth state from Redux
//   const { isAuthenticated, user } = useSelector(state => state.auth);

  

//   return (
//     // <AuthCheck>    
//       <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/shop" element={<Home />} />
//         <Route path="/product/:productId" element={<ProductDetail />} />
//         <Route path="/category/:categoryId" element={<CategoryProducts />} />

//         {/* Google Auth Callback Route - add this */}
//         <Route path="/auth/google/callback" element={<GoogleCallback />} />

//         {/* Auth routes - wrapped with AuthRoute to prevent authenticated users from accessing */}
//         <Route
//           path="/login"
//           element={
           
//               <AuthForm type="login" />
           
//           }
//         />
//         <Route
//           path="/register"
//           element={
           
//               <AuthForm type="register" />
          
//           }
//         />
//         <Route
//           path="/verify-otp"
//           element={
    
//               <OTPVerification />
        
//           }
//         />
//         <Route
//           path="/admin-login"
//           element={
           
//               <AdminLogin />
            
//           }
//         />

//         {/* Protected admin routes */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoutes allowedRoles={['admin']}>
//               <AdminDashboard />
//             </ProtectedRoutes>
//           }
//         >
//           <Route path="users" element={<UserListing />} />
//           <Route path="products" element={<Product />} />
//           <Route path="categories" element={<Category />} />
//           <Route path="categories/add" element={<AddCategory />} />
//           <Route path="categories/edit/:id" element={<EditCategory />} />
//         </Route>

//         {/* Catch all route - redirect to home */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//     // </AuthCheck>

//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {UserRoute, AdminRoute, PublicRoute} from './components/Protected-Routes.jsx';
import { useSelector } from 'react-redux';
import AdminLogin from './components/admin/AdminLogin.jsx';
import AuthForm from '../src/components/AuthForm.jsx';
import AdminDashboard from './pages/admin/Dashboard/AdminDashboard.jsx';
import UserListing from './pages/admin/UserManagement/UserListing.jsx';
import Product from './components/admin/Product.jsx';
import Category from './components/admin/category/Category.jsx';
import AddCategory from "./pages/admin/Category-Management/Add-Category.jsx";
import EditCategory from "./pages/admin/Category-Management/Edit-Category.jsx";
import Home from './pages/user/home.jsx';
import CategoryProducts from './pages/user/CategoryProducts.jsx';
import ProductDetail from './pages/user/ProductDetails.jsx';
import OTPVerification from './components/user/otp.jsx';
import GoogleCallback from './components/user/GoogleAuth.jsx';



function App() {
  // const { isAuthenticated, user } = useSelector(state => state.auth);

const { isAuthenticated: userAuthenticated, user } = useSelector(state => state.userAuth);
const { isAuthenticated: adminAuthenticated } = useSelector(state => state.adminAuth);

  return (
    <Router>
      <Routes>
        {/* Public routes that anyone can access */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Home />} />

        {/* Routes that require user authentication */}
        <Route
          path="/product/:productId"
          element={
            <UserRoute>
              <ProductDetail />
            </UserRoute>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <UserRoute>
              <CategoryProducts />
            </UserRoute>
          }
        />

        {/* Auth routes - prevent authenticated users from accessing */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthForm type="login" />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <AuthForm type="register" />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-otp"
          element={
            <PublicRoute>
              <OTPVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />

        {/* Protected admin routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="users" element={<UserListing />} />
          <Route path="products" element={<Product />} />
          <Route path="categories" element={<Category />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
        </Route>

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;