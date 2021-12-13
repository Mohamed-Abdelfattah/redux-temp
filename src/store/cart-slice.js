import { createSlice } from '@reduxjs/toolkit';

const careInitialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState: careInitialState,
  reducers: {
    addItem(state, action) {
      //the payload is expcted to be a whole product item
      const indexOfItemIfExistingInCart = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (indexOfItemIfExistingInCart === -1) {
        state.items.push({
          ...action.payload,
          amount: 1,
          total: action.payload.price,
        });
      } else {
        state.items[indexOfItemIfExistingInCart].amount++;
        state.items[indexOfItemIfExistingInCart].total +=
          state.items[indexOfItemIfExistingInCart].price;
      }
    },

    removeItem(state, action) {
      // the payload is eexpected to be only an id
      const indexOfItemIfExistingInCart = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (state.items[indexOfItemIfExistingInCart].amount === 1) {
        state.items.splice(indexOfItemIfExistingInCart, 1);
      } else {
        state.items[indexOfItemIfExistingInCart].amount--;
        state.items[indexOfItemIfExistingInCart].total -=
          state.items[indexOfItemIfExistingInCart].price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
