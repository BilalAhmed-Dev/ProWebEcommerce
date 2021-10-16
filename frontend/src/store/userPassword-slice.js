import { createSlice } from "@reduxjs/toolkit";
const UserPasswordUpdate = createSlice({
  name: "UserPasswordUpdate",
  initialState: {},
  reducers: {
    usePasswordUpdate(state, action) {
      state.loading = true;
    },
    userPasswordUpdated(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    userUpdatePasswordReset(state, action) {
      state.isUpdated = false;
    },
    userPasswordUpdateFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
    },

    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    newPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    newPasswordSuccess(state, action) {
      state.success = action.payload;
    },
    newPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const UserPasswordUpdateActions = UserPasswordUpdate.actions;
export default UserPasswordUpdate;
