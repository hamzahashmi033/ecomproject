import {
  SENDCODE_SUCCESS,
  SENDCODE_FAIL,
  VERIFYCODE_SUCCESS,
  VERIFYCODE_FAIL,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";
import { register } from "./authAction";

const baseUrl = "https://fullysent.herokuapp.com";
export const sendCode = (phoneNumber) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${baseUrl}/api/sms/sendcode`,
        { phoneNumber },
        config
      );
      dispatch(
        setAlert(SET_ALERT, {
          message: "OTP Code has been sent to your number",
          alertType: "success",
        })
      );
      window.location.replace("/verifycode");
      dispatch({ type: SENDCODE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
      dispatch({ type: SENDCODE_FAIL, payload: err.response.data });
    }
  };
};

export const verifyCode = (data) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const userr = JSON.parse(localStorage.getItem("user_detail"));
      const res = await axios.post(
        `${baseUrl}/api/sms/verifycode`,
        data,
        config
      );
      dispatch(register(userr));
      setTimeout(() => {
        localStorage.removeItem("user_detail");
        window.location.replace("/login");
      }, 2000);
      dispatch({ type: VERIFYCODE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Invalid Code",
          alertType: "danger",
        })
      );
      dispatch({ type: VERIFYCODE_FAIL, payload: err.response.data });
    }
  };
};
