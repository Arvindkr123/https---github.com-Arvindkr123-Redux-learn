import { replaceCart } from "./cart-Slice";
import { showNotification } from "./ui-Slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://redux-cart-39c93-default-rtdb.firebaseio.com/cart.json');
            if (!response.ok) {
                dispatch(showNotification({
                    status: "error",
                    title: "Error",
                    message: "getting error while fetching cart data!!"
                }))
            }
            const data = await response.json();
            return data;
        }
        try {
            const cartData = await fetchData();
            dispatch(replaceCart(cartData));
        } catch (err) {
            dispatch(showNotification({
                status: "error",
                title: "Error",
                message: "fetching cart data failed!"
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            showNotification({
                status: "pending",
                title: "Sending....",
                message: "Sending cart Data"
            })
        );
        const sendRequest = async () => {
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
        }

        try {
            await sendRequest();
            dispatch(showNotification({
                status: "success",
                title: "Success!",
                message: "Sent cart Data Successfully"
            }))
        } catch (error) {
            dispatch(showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart Data failed!"
            }))
        }
    }
}