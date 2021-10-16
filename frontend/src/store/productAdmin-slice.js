import { createSlice } from "@reduxjs/toolkit";
const productAdminSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    productAdminRequest(state, action) {
      state.loading = true;
    },
    productAdminSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
    },
    productAdminFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const productAdminActions = productAdminSlice.actions;
export default productAdminSlice;
