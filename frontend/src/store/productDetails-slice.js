import { createSlice } from "@reduxjs/toolkit";
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: null,
  },
  reducers: {
    loadingProductDetails(state, action) {
      state.loading = true;
    },
    fetchedProductDetails(state, action) {
      state.loading = false;
      state.product = action.payload;
    },
    fetchingDetailsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const productDetailsActions = productDetailsSlice.actions;
export default productDetailsSlice;
