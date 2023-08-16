import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { setAlert } from "../../../../redux/_actions/alertAction";
import { SET_ALERT } from "../../../../redux/types";
import { forgetPassword } from "../../../../redux/_actions/authAction";
import Logo from "../../../../assets/kmmart-logo/kmmart-logo.png";
import "./index.css";
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [forgetemail, setForgetemail] = useState("");
  const onChange = (e) => {
    setForgetemail(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (forgetemail === "") {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Please Fill Out Email Address",
          alertType: "danger",
        })
      );
    } else {
      dispatch(forgetPassword(forgetemail));
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
            type="email"
            name="forgetemail"
            value={forgetemail}
            onChange={onChange}
            className="input-form"
            id="standard-basic"
            label="Email Address"
          />
          <button>Send Code</button>
          <p className="agreement">
            By Continuing. you agree to Funda's
            <Link to="/"> Condition of use</Link> and
            <Link to="/"> Privacy Notice</Link>
          </p>
          <Grid container className="form-footer">
            <Grid item md={12}>
              <Link to="/">Need help?</Link>
            </Grid>
          </Grid>
        </form>
      </section>
    </>
  );
};
export default ForgetPassword;
