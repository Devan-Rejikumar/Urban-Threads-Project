// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import authReducer from '../slices/authSlice'

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['auth']
// };

// const persistedReducer = persistReducer(persistConfig, authReducer);

// export const store = configureStore({
//     reducer: {
//         auth: persistedReducer
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false
//         })
// });

// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../slices/authSlice';

// Separate configs for user and admin
const userPersistConfig = {
    key: 'userAuth',
    storage,
    whitelist: ['isAuthenticated', 'user']
};

const adminPersistConfig = {
    key: 'adminAuth',
    storage,
    whitelist: ['isAuthenticated', 'user']
};

// Create separate reducers for user and admin
const userAuthReducer = persistReducer(userPersistConfig, authReducer);
const adminAuthReducer = persistReducer(adminPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        adminAuth: adminAuthReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);


