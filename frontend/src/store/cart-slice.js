import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: [],
    shippingInfo: {},
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        /// overwriting the existing item
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
    },

    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const CartActions = cartSlice.actions;
export default cartSlice;
