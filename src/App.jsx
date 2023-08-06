import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-action';


let isInitial = true;


function App() {
  const show = useSelector(state => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);
  console.log(notification)
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  console.log(cart)
  console.log(show)

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart))
  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
