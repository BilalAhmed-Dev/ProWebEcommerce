import axios from "axios";
import { usersAdminSliceActions } from "../store/usersAdmin-slice";
// Load user "Token"
export const allUsers = () => async (dispatch) => {
  try {
    dispatch(usersAdminSliceActions.AllUsersRequest());
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch(usersAdminSliceActions.AllUsersSuccess(data.users));
  } catch (error) {
    dispatch(usersAdminSliceActions.AllUsersFail(error.response.data.message));
  }
};

// GetUser details - admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch(usersAdminSliceActions.userDetailsRequest());
    const { data } = await axios.get(`/api/v1/admin/users/${id}`);
    dispatch(usersAdminSliceActions.userDetailsSuccess(data.user));
  } catch (error) {
    dispatch(
      usersAdminSliceActions.userDetailsFail(error.response.data.message)
    );
  }
};
// Delete User - admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(usersAdminSliceActions.DeleteUserRequest());
    const { data } = await axios.delete(`/api/v1/admin/users/${id}`);
    dispatch(usersAdminSliceActions.DeleteUserSuccess(data.success));
  } catch (error) {
    dispatch(
      usersAdminSliceActions.DeleteUserFail(error.response.data.message)
    );
  }
};

export const deleteUserReset = () => (dispatch) => {
  dispatch(usersAdminSliceActions.DeleteUserReset());
};

export const clearUserErrors = () => (dispatch) => {
  dispatch(usersAdminSliceActions.clearErrors());
};
