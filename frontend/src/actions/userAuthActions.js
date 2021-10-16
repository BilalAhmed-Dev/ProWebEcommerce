import { UserAuthActions } from "../store/users-slice";
import axios from "axios";

/// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(UserAuthActions.LoadingUserAuth());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch(UserAuthActions.UserIsAuthenticated(data.user));
  } catch (error) {
    dispatch(
      UserAuthActions.UserAuthenticationFailed(error.response.data.message)
    );
  }
};

/// Register User

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(UserAuthActions.LoadingUserAuth());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(UserAuthActions.UserIsAuthenticated(data.user));
  } catch (error) {
    dispatch(
      UserAuthActions.UserAuthenticationFailed(error.response.data.message)
    );
  }
};

// Load user "Token"
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(UserAuthActions.LoadingUserAuth());
    const { data } = await axios.get("/api/v1/me");
    dispatch(UserAuthActions.UserIsAuthenticated(data.user));
  } catch (error) {
    dispatch(
      UserAuthActions.UserAuthenticationFailed(error.response.data.message)
    );
  }
};

// log out user
export const logOut = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch(UserAuthActions.LogOutUser());
  } catch (error) {
    dispatch(UserAuthActions.LogOutFail(error.response.data.message));
  }
};

export const clearAuthErrors = () => async (dispatch) => {
  dispatch(UserAuthActions.clearErrors());
};
