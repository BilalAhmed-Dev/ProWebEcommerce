import { createSlice } from "@reduxjs/toolkit";
const myOrdersSlice = createSlice({
  name: "MyOrder",
  initialState: {
    orders: [],
  },
  reducers: {
    myOrdersRequest(state, action) {
      state.loading = true;
    },
    myOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const myOrderActions = myOrdersSlice.actions;
export default myOrdersSlice;
