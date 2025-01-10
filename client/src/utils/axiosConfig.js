import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // This is crucial for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear admin data and redirect to login
      localStorage.removeItem('adminData');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export default instance;
