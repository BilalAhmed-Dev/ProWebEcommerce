import axios from "axios";
import { UserProfileUpdateActions } from "../store/userProfile-slice";

// update user profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(UserProfileUpdateActions.updateUserProfileRequest());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch(UserProfileUpdateActions.userProfileUpdated(data.success));
  } catch (error) {
    dispatch(
      UserProfileUpdateActions.UserProfileUpdateFailed(
        error.response.data.message
      )
    );
  }
};
export const userProfileUpdateReset = () => async (dispatch) => {
  try {
    dispatch(UserProfileUpdateActions.updateProfileReset());
  } catch (error) {
    dispatch(
      UserProfileUpdateActions.UserProfileUpdateFailed(
        error.response.data.message
      )
    );
  }
};

export const updateProfileClearErrors = () => async (dispatch) => {
  dispatch(UserProfileUpdateActions.clearErrors());
};
