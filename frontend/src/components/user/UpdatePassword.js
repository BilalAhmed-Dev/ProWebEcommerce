import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  updatePassword,
  userPasswordUpdateReset,
  clearErrors,
} from "../../actions/userPasswordUpdateActions";

const UpdatePassword = () => {
  const [oldpassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");

  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.UserPasswordUpdate
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isUpdated) {
      alert.success("Password updated successfully");

      history.push("/me");

      dispatch(userPasswordUpdateReset());
    }
    dispatch(clearErrors());
  }, [dispatch, alert, error, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    // formData.set("avatar", avatar);

    dispatch(updatePassword({ oldpassword, password }));
  };

  return (
    <Fragment>
      <MetaData title={"Change Password"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldpassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
