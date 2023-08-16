import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGGED_USER_SUCCESS,
  LOGGED_USER_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  LOGOUT,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";
import { getWishByUser } from "./wishlistAction";
import ReactPixel from "react-facebook-pixel";

export const register = (user, routeToHome) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/register`,
        user,
        config
      );

      ReactPixel.trackCustom("Customer Registrations");

      dispatch(
        setAlert(SET_ALERT, {
          message:
            user?.role === "customer"
              ? "Account created successfully."
              : "Your application has been submitted successfully.",
          alertType: "success",
        })
      );
      // setTimeout(() => {
      //   window.location.replace("/");
      // }, 2000);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      routeToHome();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
      // dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    }
  };
};

export const socialLogin = (data, routeToHome) => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENV}/api/auth/login/social`,
      data,
      config
    );

    ReactPixel.trackCustom("Facebook Logins");

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(
      setAlert(SET_ALERT, {
        message: "Login Successfully.",
        alertType: "success",
      })
    );

    dispatch(getWishByUser(res.data.user._id));

    routeToHome();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.data.message,
        alertType: "danger",
      })
    );
  }
};

export const login = (crediential, location, routeToHome) => {
  return async (dispatch) => {
    try {
      const config = { header: { "Content-Type": "application/json" } };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/login`,
        crediential,
        config
      );

      ReactPixel.trackCustom("Email Logins");

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(
        setAlert(SET_ALERT, {
          message: "Login Successfully.",
          alertType: "success",
        })
      );

      dispatch(getWishByUser(res.data.user._id));
      if (!(location === "login")) {
        // window.location.reload();
        routeToHome();
      } else {
        routeToHome();
        // window.location.replace("/");
      }
    } catch (err) {
      // dispatch({ type: LOGOUT });
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
      // dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
    }
  };
};

export const verifyAccount = (token) => {
  return async (dispatch) => {
    try {
      const config = { header: { "Content-Type": "application/json" } };
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/verifytoken/` + token,
        config
      );
      dispatch({ type: VERIFY_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: VERIFY_FAIL, payload: err.response?.data?.message });
    }
  };
};

export const forgetPassword = (email) => {
  return async (dispatch) => {
    try {
      const config = { header: { "Content-Type": "application/json" } };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/forgetpassword`,
        { email },
        config
      );
      dispatch(
        setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
      );
      window.location.replace("/");
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
    }
  };
};

export const resetpassword = (password, resetToken) => {
  return async (dispatch) => {
    try {
      const config = { header: { "Content-Type": "application/json" } };
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/reset/` + resetToken,
        { password },
        config
      );
      dispatch(
        setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
      );
      dispatch({ type: RESET_SUCCESS, payload: res.data });
      window.location.replace("/login");
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
      dispatch({ type: RESET_FAIL, payload: err.response.data.message });
    }
  };
};

export const getLoggedInUser = () => {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const config = { header: { "Content-Type": "application/json" } };
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/` + token,
        config
      );
      dispatch({ type: LOGGED_USER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: LOGGED_USER_FAIL,
        payload: err?.response?.data.message,
      });
      if (err?.response?.data.message === "jwt expired") {
        dispatch(
          setAlert(SET_ALERT, {
            message: "Session expired logging off",
            alertType: "danger",
          })
        );
        dispatch(logout());
      } else {
        dispatch(
          setAlert(SET_ALERT, {
            message: err?.response?.data.message,
            alertType: "danger",
          })
        );
      }
    }
  };
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
