import {
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const changeEmail = (changeEmailId, email) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENV}/api/auth/changeemail/`+ changeEmailId,
        {email},
        config
      );
      dispatch(
        setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
      );
      window.location.href = `./`;
      dispatch({ type: CHANGE_EMAIL_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.message,
          alertType: "danger",
        })
      );
      dispatch({ type: CHANGE_EMAIL_FAIL, payload: err.response.data.message });
    }
  };
};