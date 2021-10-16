import axios from "axios";
import { deleteProductActions } from "../store/deleteProduct-slice";

/// DeleteProduct "Admin"
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductActions.deleteProductRequest());

    const { data } = await axios.delete(`/api/v1/products/admin/${id}`);
    dispatch(deleteProductActions.deleteProductSuccess(data.success));
    // dispatch({
    //   type: "ALL_PRODUCTS_SUCCESS",
    //   payload: data,
    // });
  } catch (error) {
    console.log(error);
    dispatch(
      deleteProductActions.deleteProductFail(error.response.data.message)
    );
    // dispatch({
    //   type: "ALL_PRODUCTS_FAIL",
    //   payload: error.response.data.message,
    // });
  }
};

export const deleteProductReset = () => (dispatch) => {
  dispatch(deleteProductActions.deleteProductReset());
};

export const clearDeleteProductErrors = () => async (dispatch) => {
  dispatch(deleteProductActions.clearErrors());
};
