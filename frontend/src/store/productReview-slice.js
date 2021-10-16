import { createSlice } from "@reduxjs/toolkit";
const productReviewtSlice = createSlice({
  name: "productReview",
  initialState: {},
  reducers: {
    newReviewRequest(state, action) {
      state.loading = true;
    },
    newReviewSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFail(state, action) {
      state.error = action.payload;
    },
    newReviewReset(state, action) {
      state.success = false;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const productReviewActions = productReviewtSlice.actions;
export default productReviewtSlice;
