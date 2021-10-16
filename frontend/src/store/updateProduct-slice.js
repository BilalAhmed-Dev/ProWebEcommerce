import { createSlice } from "@reduxjs/toolkit";
const updateProductSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
    isUpdated: null,
  },
  reducers: {
    updateProductRequest(state, action) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateProductReset(state, action) {
      state.isUpdated = false;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const updateProductActions = updateProductSlice.actions;
export default updateProductSlice;
