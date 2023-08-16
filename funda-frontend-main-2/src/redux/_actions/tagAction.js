import {
  TAG_SUCCESS,
  TAG_FAIL,
  TAG_UPDATE_SUCCESS,
  TAG_UPDATE_FAIL,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_FAIL,
  TAG_LOAD_SUCCESS,
  TAG_LOAD_FAIL,
  SET_ALERT,
  GET_PRODUCTS_BY_TAGS,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const addTag = (tag) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/tag/createtag`,
        tag,
        config
      );
      dispatch(
        setAlert(SET_ALERT, {
          message: "Tag added successfully",
          alertType: "success",
        })
      );
      dispatch({ type: TAG_SUCCESS, payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, { message: err.message, alertType: "danger" })
      );
      dispatch({ type: TAG_FAIL, payload: err.response.data.message });
    }
  };
};
export const getProductByTag = (tag) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/product/tag`,
        tag,
        config
      );
      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: "Tag added successfully",
      //     alertType: "success",
      //   })
      // );

      dispatch({ type: GET_PRODUCTS_BY_TAGS, payload: res?.data });

      if (res?.data?.message) {
        dispatch(
          setAlert(SET_ALERT, {
            message: res?.data?.message,
            alertType: "danger",
          })
        );
      }
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, { message: err.message, alertType: "danger" })
      );
      dispatch({ type: TAG_FAIL, payload: err.response.data.message });
    }
  };
};
export const getTag = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/tag/`,
        config
      );
      dispatch({ type: TAG_LOAD_SUCCESS, payload: res?.data });
    } catch (err) {
      dispatch({
        type: TAG_LOAD_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

export const updateTag = (id, tagName) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/tag/` + id,
      { id, tagName },
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    dispatch({ type: TAG_UPDATE_SUCCESS, payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: TAG_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteTag = (id) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ENV}/api/tag/` + id,
      { id },
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    dispatch({ type: TAG_DELETE_SUCCESS, payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: TAG_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};
