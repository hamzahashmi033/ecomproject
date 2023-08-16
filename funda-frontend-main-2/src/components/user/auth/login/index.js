import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "../../../../redux/_actions/authAction";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import { useLocation } from "react-router";

import "./index.css";
import { isPasswordValid } from "../../../../utils/helpers";
const Login = () => {
  const dispatch = useDispatch();
  const [showpass, setShowpass] = useState(false);
  const showPassword = () => {
    setShowpass(!showpass);
  };
  const [loginUser, setloginUser] = useState({
    email: "",
    password: "",
  });
  const location = useLocation().pathname.split("/").splice(-1)[0];

  const { email, password } = loginUser;
  const onChange = (e) => {
    setloginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Email Address",
          alertType: "danger",
        })
      );
    } else if (password === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Password",
          alertType: "danger",
        })
      );
    } else if (!isPasswordValid(password)) {
      dispatch(
        setAlert(SET_ALERT, {
          message:
            "Your password is weak. Password should contains atleast 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
          alertType: "danger",
        })
      );
    } else {
      dispatch(login(loginUser, location));
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
          <TextField
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            className="input-form"
            id="standard-basic"
            label="Email Address"
          />
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
          <Link className="forget-password" to="/forgetpassword">
            Forget Password?
          </Link>
          <button>Login</button>
          <p className="agreement">
            By Continuing. you agree to Funda's
            <Link to="/"> Condition of use</Link> and
            <Link to="/"> Privacy Notice</Link>
          </p>
          <Grid container className="form-footer">
            <Grid item xs={6}>
              <Link to="/signup" align="center">
                Create Account
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/" align="center">
                Need help?
              </Link>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  );
};
export default Login;
