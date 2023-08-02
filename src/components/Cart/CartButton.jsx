import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { toggle } from '../../store/ui-Slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  console.log(totalQuantity)
  return (
    <button className={classes.button} onClick={() => dispatch(toggle())}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
