// store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    cart: userSlice
  },
});

export default store;
