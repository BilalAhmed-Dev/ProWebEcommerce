import { createSlice } from "@reduxjs/toolkit";
const deleteProductSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
  },
  reducers: {
    deleteProductRequest(state, action) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductReset(state, action) {
      state.isDeleted = false;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const deleteProductActions = deleteProductSlice.actions;
export default deleteProductSlice;
