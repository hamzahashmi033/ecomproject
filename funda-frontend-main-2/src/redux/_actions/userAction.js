import {
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_SINGLE_LOAD_SUCCESS,
  USER_SINGLE_LOAD_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const getUser = () => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENV}/api/user/`,
      config
    );

    dispatch({ type: USER_LOAD_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: USER_LOAD_FAIL, payload: err.response.data.message });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENV}/api/user/` + id,
      config
    );
    dispatch({ type: USER_SINGLE_LOAD_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: USER_SINGLE_LOAD_FAIL,
      payload: err.response.data.message,
    });
  }
};
// export const updateUser =
//   (id, fullName, phoneNumber, email, password) => async (dispatch) => {
//     try {
//       const config = { header: { "Content-Type": "application/json" } };
//       const res = await axios.patch(
//         `${process.env.REACT_APP_BACKEND_ENV}/api/user/update/` + id,
//         { fullName, phoneNumber, email, password },
//         config
//       );
//       dispatch(
//         setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
//       );
//       dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
//       window.location.href = `./`;
//     } catch (err) {
//       dispatch({ type: USER_UPDATE_FAIL, payload: err.message });
//     }
//   };
export const updateUser = (id, updobj) => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/user/update/${id}`,
      updobj,
      config
    );
    dispatch(
      setAlert(SET_ALERT, {
        message: "Account Updated Successfully",
        alertType: "success",
      })
    );
    // dispatch(
    //   setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    // );
    // dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
    window.location.href = `./`;
  } catch (err) {
    dispatch({ type: USER_UPDATE_FAIL, payload: err.message });
  }
};

export const deleteUser = (id, status) => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENV}/api/user/dectivateuser/${id}`,
      { status },
      config
    );

    dispatch(
      setAlert(SET_ALERT, {
        message: "User was succesfully de-activated",
        alertType: "success",
      })
    );
    dispatch({ type: USER_DELETE_SUCCESS, payload: res.data });
    //window.location.reload();
  } catch (err) {
    dispatch({ type: USER_DELETE_FAIL, payload: err.message });
  }
};

export const activateUser = (id, status) => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/user/activateuser/${id}`,
      { status },
      config
    );

    dispatch(
      setAlert(SET_ALERT, {
        message: "User was succesfully activated",
        alertType: "success",
      })
    );
    dispatch({ type: USER_DELETE_SUCCESS, payload: res.data });
    //window.location.reload();
  } catch (err) {
    dispatch({ type: USER_DELETE_FAIL, payload: err.message });
  }
};
