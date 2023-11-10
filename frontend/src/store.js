import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlices';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
console.log('api reducer  ',apiSlice);
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: true,
})

export default store;