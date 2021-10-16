import { createSlice } from "@reduxjs/toolkit";
const updateOrderSlice = createSlice({
  name: "updateOrders",
  initialState: {},
  reducers: {
    updateOrderRequest(state, action) {
      state.loading = true;
    },
    updateOrderSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateOrderReset(state, action) {
      state.isUpdated = false;
    },
    updateOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const updateOrderActions = updateOrderSlice.actions;
export default updateOrderSlice;
