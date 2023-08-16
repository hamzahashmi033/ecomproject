import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resetpassword } from "../../../../redux/_actions/authAction";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import "./index.css";
const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const [showpass, setShowpass] = useState(false);
  const [showConpass, setShowConpass] = useState(false);
  const showPassword = () => {
    setShowpass(!showpass);
  };
  const showConPassword = () => {
    setShowConpass(!showConpass);
  };
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = newPassword;
  const onChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out All Fields",
          alertType: "danger",
        })
      );
    } else if (password.length < 8) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Password should be greater than 8 characters.",
          alertType: "danger",
        })
      );
    } else if (password !== confirmPassword) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Password and confirm password not matched.",
          alertType: "danger",
        })
      );
    } else {
      dispatch(resetpassword(password, props.match.params.token));
    }
  };
  return (
    <>
      <section className="login-wrapper auth-wrapper">
        <form className="login-form" autoComplete="off" onSubmit={onSubmit}>
          <div className="logo-box">
            <Link to="/">
              <img src={"/favicon.png"} alt="" />
            </Link>
          </div>
          <div className="password-input-wrapper">
            <TextField
              id="outlined-password-input"
              type={showpass === true ? `text` : `password`}
              className="input-form"
              name="password"
              value={password}
              onChange={onChange}
              label="Password"
              autoComplete="current-password"
            />
            <span onClick={() => showPassword()}>
              <FontAwesomeIcon icon={showpass === true ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="password-input-wrapper">
            <TextField
              id="outlined-password-input"
              type={showConpass === true ? `text` : `password`}
              className="input-form"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              label="Confirm Password"
              autoComplete="current-password"
            />
            <span onClick={() => showConPassword()}>
              <FontAwesomeIcon
                icon={showConpass === true ? faEyeSlash : faEye}
              />
            </span>
          </div>
          <button>Reset Password</button>
          <p className="agreement">
            By Continuing. you agree to Funda's
            <Link to="/"> Condition of use</Link> and
            <Link to="/"> Privacy Notice</Link>
          </p>
          <Grid container className="form-footer">
            <Grid item xs={12}>
              <Link to="/">Need help?</Link>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  );
};
export default ResetPassword;
