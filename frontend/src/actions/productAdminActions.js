import axios from "axios";
import { productAdminActions } from "../store/productAdmin-slice";
import { productReviewAdminActions } from "../store/adminProductReview-slice";
export const getAdminProducts =
  (
    alert = {
      error() {},
    },
    history = {
      push() {},
    }
  ) =>
  async (dispatch) => {
    try {
      dispatch(productAdminActions.productAdminRequest());

      const { data } = await axios.get("/api/v1/products/admin/allProducts");
      dispatch(productAdminActions.productAdminSuccess(data));
      // dispatch({
      //   type: "ALL_PRODUCTS_SUCCESS",
      //   payload: data,
      // });
    } catch (error) {
      alert.error("Please log in as admin to access this resource");
      history.push("/");
      // dispatch(
      //   productAdminActions.productAdminFail(error.response.data.message)
      // );
      // dispatch({
      //   type: "ALL_PRODUCTS_FAIL",
      //   payload: error.response.data.message,
      // });
    }
  };

/// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch(productReviewAdminActions.productReviewAdminRequest());

    const { data } = await axios.get(`/api/v1/products/admin/reviews?id=${id}`);

    dispatch(productReviewAdminActions.productReviewAdminSuccess(data.reviews));
  } catch (error) {
    dispatch(
      productReviewAdminActions.productReviewAdminFail(
        error.response.data.message
      )
    );
  }
};
/// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch(productReviewAdminActions.productReviewDeleteRequest());

    const { data } = await axios.delete(
      `/api/v1/products/admin/reviews?id=${id}&productId=${productId}`
    );

    dispatch(
      productReviewAdminActions.productReviewDeleteSuccess(data.success)
    );
  } catch (error) {
    dispatch(
      productReviewAdminActions.productReviewDeleteFail(
        error.response.data.message
      )
    );
  }
};

export const deleteReviewReset = () => (dispatch) => {
  dispatch(productReviewAdminActions.productReviewDeleteReset());
};

export const clearAdminProductErrors = () => async (dispatch) => {
  dispatch(productAdminActions.clearErrors());
};
