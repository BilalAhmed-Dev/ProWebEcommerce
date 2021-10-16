import axios from "axios";
import { adminUpdateUserActions } from "../store/adminUpdateUser-slice";

///// Update user - ADMIN

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch(adminUpdateUserActions.adminUpdateUserRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/users/${id}`,
      userData,
      config
    );
    dispatch(adminUpdateUserActions.adminUpdateSuccess(data.success));
  } catch (error) {
    dispatch(
      adminUpdateUserActions.adminUpdateFail(error.response.data.message)
    );
  }
};

export const updateUserReset = () => (dispatch) => {
  dispatch(adminUpdateUserActions.adminUpdateUserReset());
};
export const clearaUpdateUserError = () => (dispatch) => {
  dispatch(adminUpdateUserActions.clearErrors());
};
