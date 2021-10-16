import { createSlice } from "@reduxjs/toolkit";
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
  },
  reducers: {
    orderDetailsRequest(state, action) {
      state.loading = true;
    },
    orderDetailsSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const orderDetailsActions = orderDetailsSlice.actions;
export default orderDetailsSlice;
