import { createSlice } from "@reduxjs/toolkit";
const newProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    product: {},
  },
  reducers: {
    newProductRequest(state, action) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newProductReset(state, action) {
      state.success = false;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const newProductActions = newProductSlice.actions;
export default newProductSlice;
