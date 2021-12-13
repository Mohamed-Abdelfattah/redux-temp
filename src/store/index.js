import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart-slice';
import cartUiReducer from './ui-slice';

const store = configureStore({
  reducer: { cartStateAtStore: cartReducer, cartUiStateAtStore: cartUiReducer },
});

export default store;
