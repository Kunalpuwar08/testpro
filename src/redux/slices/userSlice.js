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
  },
});

export const { addCart, clearCart } = userSlice.actions;

export default userSlice.reducer;
