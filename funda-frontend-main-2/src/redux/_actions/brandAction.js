import {
  BRAND_SUCCESS,
  BRAND_FAIL,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_LOAD_SUCCESS,
  BRAND_LOAD_FAIL,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const addBrand = (brand) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/brand/createbrand`,
        brand,
        config
      );
      dispatch(
        setAlert(SET_ALERT, {
          message: "Brand added successfully",
          alertType: "success",
        })
      );
      // dispatch({ type: BRAND_SUCCESS, payload: res.data });
      // window.location.reload();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, { message: err.message, alertType: "danger" })
      );
      dispatch({ type: BRAND_FAIL, payload: err.response.data.message });
    }
  };
};

export const getBrand = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/brand/`,
        config
      );
      dispatch({ type: BRAND_LOAD_SUCCESS, payload: res?.data });
    } catch (err) {
      dispatch({
        type: BRAND_LOAD_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };
};

export const updateBrand = (id, brandName, brandImage) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/brand/` + id,
      { id, brandName, brandImage },
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    dispatch({ type: BRAND_UPDATE_SUCCESS, payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: BRAND_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ENV}/api/brand/` + id,
      { id },
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    dispatch({ type: BRAND_DELETE_SUCCESS, payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};
