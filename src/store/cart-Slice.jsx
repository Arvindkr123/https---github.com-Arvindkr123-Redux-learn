import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },

        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                // if item is not exist then add the new item
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                //  if item is exist then increase the qty and price
                existingItem.quantity = existingItem.quantity + 1;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemToCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                // if existing qty is one then remove that item from the array
                state.items = state.items.filter(item => item.id !== id);
            } else {
                // if existing qty is greater than one decrease the qty and total amount also
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})



export const { addItemToCart, removeItemToCart, replaceCart } = cartSlice.actions;
export default cartSlice;