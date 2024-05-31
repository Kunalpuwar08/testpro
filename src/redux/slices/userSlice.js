import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    cartData: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.cartData.push(action.payload);
    },
    clearCart: (state) => {
      state.cartData = [];
    },
    deleteCartItem: (state, action) => {
      state.cartData = state.cartData.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addCart, clearCart, deleteCartItem } = userSlice.actions;

export default userSlice.reducer;
