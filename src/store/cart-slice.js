import { createSlice } from '@reduxjs/toolkit';

const careInitialState = { items: [], flag: true };
// this flag is for the first time retriving data from database to repopulate the cart
// it is intended to be used to prevent the sending of the data at the initial loading
// and it will be changed whenever item added or removed to allow data sending

const cartSlice = createSlice({
  name: 'cart',
  initialState: careInitialState,
  reducers: {
    replaceCart(state, action) {
      // this is typically used to populate cart data that user chose before
      state.items = action.payload.items || [];
    },
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
      state.flag = false;
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
      state.flag = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
