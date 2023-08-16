import {
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_LOAD_SUCCESS,
  PRODUCT_LOAD_FAIL,
  PRODUCT_SINGLE_LOAD_SUCCESS,
  PRODUCT_SINGLE_LOAD_FAIL,
  PRODUCT_EMPTY_SET,
  SELLER_PRODUCTS,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const addProduct = (product) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "multipart/form-data" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/product/createProduct`,
        product,
        config
      );
      dispatch(
        setAlert(SET_ALERT, {
          message: "Product added successfully",
          alertType: "success",
        })
      );

      dispatch({ type: PRODUCT_SUCCESS, payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, { message: err.message, alertType: "danger" })
      );
      dispatch({ type: PRODUCT_FAIL, payload: err.response.data.message });
    }
  };
};

export const getProduct = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/product/`,
        config
      );

      dispatch({ type: PRODUCT_LOAD_SUCCESS, payload: res?.data?.data });
    } catch (err) {
      dispatch({
        type: PRODUCT_LOAD_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };
};
export const getProductsByCreatedBy = (sellerid) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/product/getProductsByCreatedBy/${sellerid}`,
        config
      );
      dispatch({ type: SELLER_PRODUCTS, payload: res?.data?.data });
    } catch (err) {
      dispatch({
        type: PRODUCT_LOAD_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };
};

export const getProductById = (productId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/product/` + productId,
        config
      );

      if (res.data === null) {
        dispatch({ type: PRODUCT_EMPTY_SET, payload: res.data });
      } else {
        dispatch({ type: PRODUCT_SINGLE_LOAD_SUCCESS, payload: res.data });
      }
    } catch (err) {
      dispatch({
        type: PRODUCT_SINGLE_LOAD_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const updateProduct = (id, data) => async (dispatch) => {
  const config = { header: { "Content-Type": "multipart/form-data" } };
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/product/update/${id}`,
      data,
      config
    );

    dispatch(
      setAlert(SET_ALERT, {
        message: "Product was updated successfully",
        alertType: "success",
      })
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: "ERRROR",
        alertType: "danger",
      })
    );
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ENV}/api/product/remove/${id}`,
      config
    );

    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: err.response?.data?.message,
    });
  }
};
