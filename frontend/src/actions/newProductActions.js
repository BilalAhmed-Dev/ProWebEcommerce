import axios from "axios";
import { newProductActions } from "../store/newProduct-slice";

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductActions.newProductRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/products/admin/new`,
      productData,
      config
    );
    dispatch(newProductActions.newProductSuccess(data));
    // dispatch({
    //   type: "ALL_PRODUCTS_SUCCESS",
    //   payload: data,
    // });
  } catch (error) {
    console.log(error);
    dispatch(newProductActions.newProductFail(error.response.data.message));
    // dispatch({
    //   type: "ALL_PRODUCTS_FAIL",
    //   payload: error.response.data.message,
    // });
  }
};

export const newProductReset = () => (dispatch) => {
  dispatch(newProductActions.newProductReset());
};

export const clearnewProductErrors = () => async (dispatch) => {
  dispatch(newProductActions.clearErrors());
};
