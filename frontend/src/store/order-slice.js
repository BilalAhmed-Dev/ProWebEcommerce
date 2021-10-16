import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
  name: "Order",
  initialState: {},
  reducers: {
    createOrderRequest(state, action) {
      state.loading = true;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const OrderActions = orderSlice.actions;
export default orderSlice;
