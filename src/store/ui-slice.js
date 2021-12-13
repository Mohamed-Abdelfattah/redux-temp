import { createSlice } from '@reduxjs/toolkit';

const cartUiSlice = createSlice({
  name: 'cart-ui',
  initialState: { showCart: false, notification: null },
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
    notify(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const cartUiActions = cartUiSlice.actions;

export default cartUiSlice.reducer;
