import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from './store/ui-Slice';
import Notification from './components/UI/Notification';

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
    const sendCartData = async () => {
      dispatch(showNotification({
        status: "pending",
        title: "Sending....",
        message: "Sending cart Data"
      }))
      const response = await fetch('https://redux-cart-39c93-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if (!response.ok) {
        dispatch(showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!"
        }))
      }
      const responseData = await response.json();
      dispatch(showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart Data Successfully"
      }))
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(showNotification({
        status: "error",
        title: "Error!",
        message: "Sending cart Data failed!"
      }))
    })
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
