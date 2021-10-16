import axios from "axios";
import { productReviewActions } from "../store/productReview-slice";

export const createProductReview = (reviewData) => async (dispatch) => {
  try {
    dispatch(productReviewActions.newReviewRequest());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/products/review`,
      reviewData,
      config
    );
    dispatch(productReviewActions.newReviewSuccess(data.success));
  } catch (error) {
    console.log(error);
    dispatch(productReviewActions.newReviewFail(error.response.data.message));
  }
};

export const createProductReviewReset = () => (dispatch) => {
  dispatch(productReviewActions.newReviewReset());
};

export const clearProductReviewErrors = () => async (dispatch) => {
  dispatch(productReviewActions.clearErrors());
};
