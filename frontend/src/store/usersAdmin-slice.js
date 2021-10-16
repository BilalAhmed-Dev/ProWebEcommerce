import { createSlice } from "@reduxjs/toolkit";
const usersAdminSlice = createSlice({
  name: "usersAdminSlice",
  initialState: {
    users: [],
    user: {},
    error: null,
    isDeleted: null,
  },
  reducers: {
    AllUsersRequest(state, action) {
      state.loading = true;
    },

    AllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    AllUsersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    DeleteUserRequest(state, action) {
      state.loading = true;
    },

    DeleteUserSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DeleteUserReset(state, action) {
      state.isDeleted = false;
    },
    DeleteUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userDetailsRequest(state, action) {
      state.loading = true;
    },

    userDetailsSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    userDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const usersAdminSliceActions = usersAdminSlice.actions;
export default usersAdminSlice;
