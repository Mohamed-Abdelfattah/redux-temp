import { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/UI/Notification';
import Products from './components/Shop/Products';
import { cartUiActions } from './store/ui-slice';

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
    const sendCartData = async () => {
      //
      dispatch(
        cartUiActions.notify({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch(
        'https://react-section-14-df738-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('sending cart data failed');
      }

      dispatch(
        cartUiActions.notify({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfuly!',
        })
      );
    };

    if (initial) {
      initial = false;
      return;
    }
    // !initial &&
    sendCartData().catch((error) => {
      dispatch(
        cartUiActions.notify({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed',
        })
      );
      console.log(error);
    });
    //
    // initial = false;
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
