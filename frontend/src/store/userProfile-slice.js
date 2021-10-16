import { createSlice } from "@reduxjs/toolkit";
const UserProfileUpdate = createSlice({
  name: "UserProfileUpdate",
  initialState: {},
  reducers: {
    updateUserProfileRequest(state, action) {
      state.loading = true;
    },
    userProfileUpdated(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateProfileReset(state, action) {
      state.isUpdated = false;
    },
    UserProfileUpdateFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state, action) {
      state.error = null;
    },
  },
});

export const UserProfileUpdateActions = UserProfileUpdate.actions;
export default UserProfileUpdate;
