// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//       isAuthenticated: false,
//       user: null,
//       loading: true, // Start with loading true
//       error: null
//     },
//     reducers: {
//       loginStart: (state) => {
//         state.loading = true;
//         state.error = null;
//       },
//       loginSuccess: (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.loading = false;
//         state.error = null;
//       },
//       loginFailure: (state, action) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.loading = false;
//         state.error = action.payload;
//       },
//       logout: (state) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.loading = false;
//         state.error = null;
//         // Clear localStorage
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         // Clear axios header
//         delete axios.defaults.headers.common['Authorization'];
//       }
//     }
//   });
// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   error: null,
//   loading: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true; // Corrected: Set loading to true
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false; // Corrected: Set loading to false
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false; // Corrected: Set loading to false
//       state.isAuthenticated = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // User authentication actions
        userLoginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        userLoginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        userLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            return initialState;
        },

        // Admin authentication actions
        adminLoginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        adminLoginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = { ...action.payload, role: 'admin' };
            state.error = null;
        },
        adminLoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        adminLogout: (state) => {
            return initialState;
        }
    }
});

export const {
    userLoginStart,
    userLoginSuccess,
    userLoginFailure,
    userLogout,
    adminLoginStart,
    adminLoginSuccess,
    adminLoginFailure,
    adminLogout
} = authSlice.actions;

export default authSlice.reducer;