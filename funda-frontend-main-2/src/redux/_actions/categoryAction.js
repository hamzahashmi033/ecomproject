import {
  CATEGORY_SUCCESS,
  CATEGORY_FAIL,
  CATEGORY_LOAD_SUCCESS,
  CATEGORY_LOAD_FAIL,
  CATEGORY_EMPTY_SET,
  CATEGORY_SINGLE_LOAD_SUCCESS,
  CATEGORY_SINGLE_LOAD_FAIL,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const addCategory = (Category) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/category/createCategory`,
        Category,
        config
      );
      dispatch(
        setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
      );
      window.location.reload();
      dispatch({ type: CATEGORY_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
      dispatch({ type: CATEGORY_FAIL, payload: err.response.data.message });
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/category/`,
        config
      );

      dispatch({ type: CATEGORY_LOAD_SUCCESS, payload: res?.data?.data });
    } catch (err) {
      dispatch({
        type: CATEGORY_LOAD_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

export const getCategoryBySubCategoryId = (SubCategoryId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/category/` + SubCategoryId,
        config
      );

      if (res.data === []) {
        dispatch({ type: CATEGORY_EMPTY_SET, payload: res.data });
      } else {
        dispatch({ type: CATEGORY_SINGLE_LOAD_SUCCESS, payload: res.data });
      }
    } catch (err) {
      dispatch({
        type: CATEGORY_SINGLE_LOAD_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const updateCategory = (id, body) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/category/` + id,
      body,
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: res.data });
    // window.location.reload();
    dispatch(getCategory());
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: err.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ENV}/api/category/` + id,
      { id },
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    window.location.reload();
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};
