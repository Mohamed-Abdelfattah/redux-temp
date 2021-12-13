import { useDispatch, useSelector } from 'react-redux';

import { cartUiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  //
  const dispatch = useDispatch();

  const totalNumberOfItems = useSelector(
    (state) => state.cartStateAtStore.items
  ).reduce((accumlated, current) => accumlated + current.amount, 0);

  const toggleCartHandler = () => {
    // console.log('clicked');
    dispatch(cartUiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalNumberOfItems}</span>
    </button>
  );
};

export default CartButton;
