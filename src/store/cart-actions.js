import { cartUiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const sendCartDataThunk = (cart) => {
  return async (dispatch) => {
    //
    dispatch(
      cartUiActions.notify({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
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

    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        cartUiActions.notify({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed',
        })
      );
      console.log(error);
    }
  };
};

export const fetchCartDataThunk = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-section-14-df738-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('OOPS! something went wrong');
      }
      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      console.log(cartData);
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        cartUiActions.notify({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed',
        })
      );
      console.log(error);
    }
  };
};
