import axios from "axios";
import { updateProductActions } from "../store/updateProduct-slice";
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductActions.updateProductRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/products/admin/${id}`,
      productData,
      config
    );

    dispatch(updateProductActions.updateProductSuccess(data.success));
    // dispatch({
    //   type: "ALL_PRODUCTS_SUCCESS",
    //   payload: data,
    // });
  } catch (error) {
    console.log(error);
    dispatch(
      updateProductActions.updateProductFail(error.response.data.message)
    );
    // dispatch({
    //   type: "ALL_PRODUCTS_FAIL",
    //   payload: error.response.data.message,
    // });
  }
};

export const updateProductReset = () => (dispatch) => {
  dispatch(updateProductActions.updateProductReset());
};

export const clearUpdateProductErrors = () => async (dispatch) => {
  dispatch(updateProductActions.clearErrors());
};
