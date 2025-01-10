import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { initializeAuth } from './utils/initializeAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Initialize auth
initializeAuth(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="855101367831-0lslv6bo010d4jrhcqr86tdmh9fja3l5.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);