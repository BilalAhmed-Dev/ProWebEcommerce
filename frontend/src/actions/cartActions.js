import axios from "axios";
import { CartActions } from "../store/cart-slice";

/// Add item to cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  dispatch(
    CartActions.addToCart({
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
/// Remove item from cart
export const removeCartItem = (id) => async (dispatch, getState) => {
  dispatch(CartActions.removeCartItem(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch(CartActions.saveShippingInfo(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
