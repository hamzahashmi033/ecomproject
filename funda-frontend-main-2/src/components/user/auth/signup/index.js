import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { register } from "../../../../redux/_actions/authAction";
import "./index.css";
import { isPasswordValid } from "../../../../utils/helpers";
const Signup = () => {
  const dispatch = useDispatch();
  const [showpass, setShowpass] = useState(false);
  const [showConpass, setShowConpass] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    isActive: "false",
  });
  const { fullName, phoneNumber, email, password, confirmPassword } = newUser;
  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const showPassword = () => {
    setShowpass(!showpass);
  };
  const showConfirmPassword = () => {
    setShowConpass(!showConpass);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (fullName === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Full Name",
          alertType: "danger",
        })
      );
    } else if (phoneNumber === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Phone Number",
          alertType: "danger",
        })
      );
    } else if (email === "") {
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
    } else if (confirmPassword !== password) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Password and confirm password doesnot match",
          alertType: "danger",
        })
      );
    } else {
      dispatch(register(newUser));
    }
  };
  return (
    <>
      <section className="register-wrapper auth-wrapper">
        <form className="register-form" autoComplete="off" onSubmit={onSubmit}>
          <div className="logo-box">
            <Link to="/">
              <img src={"/favicon.png"} alt="" />
            </Link>
          </div>
          <TextField
            name="fullName"
            value={fullName}
            onChange={onChange}
            inputProps={{
              maxLength: 40,
            }}
            className="input-form"
            id="standard-basic"
            label="Full Name"
          />
          <TextField
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
            className="input-form"
            id="standard-basic"
            label="Mobile Number"
          />
          <TextField
            name="email"
            type="email"
            value={email}
            inputProps={{
              maxLength: 40,
            }}
            onChange={onChange}
            className="input-form"
            id="standard-basic"
            label="Email Address"
          />
          <div className="password-input-wrapper">
            <TextField
              name="password"
              type={showpass === true ? `text` : `password`}
              inputProps={{
                maxLength: 40,
              }}
              value={password}
              onChange={onChange}
              className="input-form"
              id="standard-basic"
              label="Password"
            />
            <span onClick={() => showPassword()}>
              <FontAwesomeIcon icon={showpass === true ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="password-input-wrapper">
            <TextField
              name="confirmPassword"
              type={showConpass === true ? `text` : `password`}
              inputProps={{
                maxLength: 40,
              }}
              value={confirmPassword}
              onChange={onChange}
              className="input-form "
              id="standard-basic"
              label="Confirm Password"
            />
            <span onClick={() => showConfirmPassword()}>
              <FontAwesomeIcon
                icon={showConpass === true ? faEyeSlash : faEye}
              />
            </span>
          </div>
          <p className="verify-text">
            We will send you a code to verify your email Address
          </p>
          <button>Register</button>
          <p className="already-hava-an-account">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </>
  );
};
export default Signup;
