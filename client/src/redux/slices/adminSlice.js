import { createSlice } from '@reduxjs/toolkit';

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    isAuthenticated: false,
    admin: null
  },
  reducers: {
    loginAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
    }
  }
});
