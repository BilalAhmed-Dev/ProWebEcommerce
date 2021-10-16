import { createSlice } from "@reduxjs/toolkit";
const adminUpdateUserSlice = createSlice({
  name: "adminUpdateUser",
  initialState: {},
  reducers: {
    adminUpdateUserRequest(state, action) {
      state.loading = true;
    },
    adminUpdateSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    adminUpdateFail(state, action) {
      state.isUpdated = false;
    },
    adminUpdateUserReset(state, action) {
      state.isUpdated = false;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const adminUpdateUserActions = adminUpdateUserSlice.actions;
export default adminUpdateUserSlice;
