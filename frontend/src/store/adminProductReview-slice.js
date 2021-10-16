import { createSlice } from "@reduxjs/toolkit";
const productReviewAdminSlice = createSlice({
  name: "products",
  initialState: {
    reviews: [],
    loading: null,
    isDeleted: null,
    error: null,
  },
  reducers: {
    productReviewAdminRequest(state, action) {
      state.loading = true;
    },
    productReviewAdminSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
    },
    productReviewAdminFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    productReviewDeleteRequest(state, action) {
      state.loading = true;
    },
    productReviewDeleteSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    productReviewDeleteReset(state, action) {
      state.isDeleted = false;
    },
    productReviewDeleteFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const productReviewAdminActions = productReviewAdminSlice.actions;
export default productReviewAdminSlice;
