import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/UI/Notification';
import Products from './components/Shop/Products';
import { sendCartDataThunk, fetchCartDataThunk } from './store/cart-actions';

let initial = true;

function App() {
  //
  const dispatch = useDispatch();
  const renderCart = useSelector((state) => state.cartUiStateAtStore.showCart);
  const cart = useSelector((state) => state.cartStateAtStore);
  const showNotification = useSelector(
    (state) => state.cartUiStateAtStore.notification
  );

  useEffect(() => {
    //
    dispatch(fetchCartDataThunk());
  }, []);

  useEffect(() => {
    //
    if (initial) {
      initial = false;
      return;
    }

    if (cart.flag) return;

    dispatch(sendCartDataThunk(cart));
    //
  }, [cart, dispatch]);

  return (
    <Fragment>
      {showNotification && (
        <Notification
          status={showNotification.status}
          title={showNotification.title}
          message={showNotification.message}
        />
      )}
      <Layout>
        {renderCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
