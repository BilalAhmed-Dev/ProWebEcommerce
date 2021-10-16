import axios from "axios";
import { productDetailsActions } from "../store/productDetails-slice";

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsActions.loadingProductDetails());

    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch(productDetailsActions.fetchedProductDetails(data.product));
    // dispatch({
    //   type: "ALL_PRODUCTS_SUCCESS",
    //   payload: data,
    // });
  } catch (error) {
    console.log(error);
    dispatch(
      productDetailsActions.fetchingDetailsFailed(error.response.data.message)
    );
    // dispatch({
    //   type: "ALL_PRODUCTS_FAIL",
    //   payload: error.response.data.message,
    // });
  }
};

export const clearProductDetailsErrors = () => async (dispatch) => {
  dispatch(productDetailsActions.clearErrors());
};
