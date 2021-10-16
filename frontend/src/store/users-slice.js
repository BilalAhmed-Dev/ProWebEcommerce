import { createSlice } from "@reduxjs/toolkit";
const userAuth = createSlice({
  name: "UserAuth",
  initialState: {
    user: null,
  },
  reducers: {
    LoadingUserAuth(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    UserIsAuthenticated(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    UserAuthenticationFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    LogOutUser(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    LogOutFail(state, action) {
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const UserAuthActions = userAuth.actions;
export default userAuth;
