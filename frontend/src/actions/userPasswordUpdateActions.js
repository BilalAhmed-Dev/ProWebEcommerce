import axios from "axios";

import { UserPasswordUpdateActions } from "../store/userPassword-slice";

// update user password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch(UserPasswordUpdateActions.usePasswordUpdate());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      "/api/v1/password/update",
      passwords,
      config
    );
    dispatch(UserPasswordUpdateActions.userPasswordUpdated(data));
  } catch (error) {
    dispatch(
      UserPasswordUpdateActions.userPasswordUpdateFailed(
        error.response.data.message
      )
    );
  }
};

export const userPasswordUpdateReset = () => async (dispatch) => {
  try {
    dispatch(UserPasswordUpdateActions.userUpdatePasswordReset());
  } catch (error) {
    dispatch(
      UserPasswordUpdateActions.userPasswordUpdateFailed(
        error.response.data.message
      )
    );
  }
};

///// Forgot password

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(UserPasswordUpdateActions.forgotPasswordRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/password/forgot", email, config);
    dispatch(UserPasswordUpdateActions.forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(
      UserPasswordUpdateActions.forgotPasswordFail(error.response.data.message)
    );
  }
};

/// Reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(UserPasswordUpdateActions.newPasswordRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    dispatch(UserPasswordUpdateActions.newPasswordSuccess(data.success));
  } catch (error) {
    dispatch(
      UserPasswordUpdateActions.newPasswordFail(error.response.data.message)
    );
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(UserPasswordUpdateActions.clearErrors());
};
