import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice.js";
import productDetailsSlice from "./productDetails-slice.js";
import UserProfileUpdate from "./userProfile-slice.js";
import UserPasswordUpdate from "./userPassword-slice.js";
import userAuth from "./users-slice";
import cartSlice from "./cart-slice.js";
import orderSlice from "./order-slice";
import myOrdersSlice from "./myOrders-slice";
import orderDetailsSlice from "./orderDetails-slice";
import productReviewtSlice from "./productReview-slice";
import productAdminSlice from "./productAdmin-slice";
import newProductSlice from "./newProduct-slice";
import deleteProductSlice from "./deleteProduct-slice";
import updateProductSlice from "./updateProduct-slice";
import AdminAllOrderSlice from "./orderAdmin-slice";
import updateOrderSlice from "./updateOrderAdmin-slice";
import usersAdminSlice from "./usersAdmin-slice";
import adminUpdateUserSlice from "./adminUpdateUser-slice";
import productReviewAdminSlice from "./adminProductReview-slice";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    userAuth: userAuth.reducer,
    userProfileUpdate: UserProfileUpdate.reducer,
    UserPasswordUpdate: UserPasswordUpdate.reducer,
    cart: cartSlice.reducer,
    newOrder: orderSlice.reducer,
    myOrders: myOrdersSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    productReview: productReviewtSlice.reducer,
    productAdmin: productAdminSlice.reducer,
    newProduct: newProductSlice.reducer,
    deleteProduct: deleteProductSlice.reducer,
    updateProduct: updateProductSlice.reducer,
    allOrders: AdminAllOrderSlice.reducer,
    order: updateOrderSlice.reducer,
    allUsers: usersAdminSlice.reducer,
    updateUser: adminUpdateUserSlice.reducer,
    allReviewsReducer: productReviewAdminSlice.reducer,
  },
  preloadedState: initialState,
});

export default store;
