import { createSlice } from "@reduxjs/toolkit";
const AdminAllOrderSlice = createSlice({
  name: "AdminAllOrdersAndDeleteOrder",
  initialState: {
    orders: [],
  },
  reducers: {
    AdminAllOrderRequest(state, action) {
      state.loading = true;
    },
    AdminAllOrderSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalAmount = action.payload.totalAmount;
    },
    AdminAllOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    AdminDeleteOrderRequest(state, action) {
      state.loading = true;
    },
    AdminDeleteOrderSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    AdminDeleteOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    AdminDeleteOrderReset(state, action) {
      state.isDeleted = false;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const AdminAllOrderActions = AdminAllOrderSlice.actions;
export default AdminAllOrderSlice;
