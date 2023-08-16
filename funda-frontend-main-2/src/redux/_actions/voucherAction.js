import axios from "axios";
import {
  GET_VOUCHER_FAIL,
  GET_VOUCHER_SUCCESS,
  LOAD_VOUCHERS_FAIL,
  LOAD_VOUCHERS_SUCCESS,
  ADD_VOUCHER_FAIL,
  ADD_VOUCHER_SUCCESS,
  SET_ALERT,
  VALIDATE_VOUCHER_SUCCESS,
  DELETE_VOUCHER_SUCCESS,
  VALIDATE_VOUCHER_FAIL,
} from "../types";
import { setAlert } from "./alertAction";

export const addVoucher = (voucher) => async (dispatch) => {

  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENV}/api/voucher/add`,
      voucher,
      config
    );
  
    dispatch({ type: ADD_VOUCHER_SUCCESS, payload: res.data.voucher });
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err?.response?.data?.message,
        alertType: "danger",
      })
    );
    dispatch({ type: ADD_VOUCHER_FAIL, payload: err?.response?.data?.message });
   
  }
};

export const getVoucher = () => async (dispatch) => {
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_ENV}/api/voucher/get`,
      config
    );

    dispatch({ type: LOAD_VOUCHERS_SUCCESS, payload: res.data.vouchers });
  } catch (err) {
  
    dispatch(
      setAlert(SET_ALERT, {
        message: err?.response?.data?.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: LOAD_VOUCHERS_FAIL,
      payload: err?.response?.data?.message,
    });
  }
};

export const getVoucherByCode = (code) => async (dispatch) => {

  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENV}/api/voucher/getbycode/${code}`,
      config
    );

  } catch (err) {

    dispatch({ type: GET_VOUCHER_FAIL, payload: err.response.data.message });
    dispatch(
      setAlert(SET_ALERT, {
        message: err?.response?.data?.message,
        alertType: "danger",
      })
    );
  }
};

export const validateVoucher = (code) => async (dispatch) => {
 
  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_ENV}/api/voucher/checkvoucher`,
      code,
      config
    );
 
    dispatch({ type: VALIDATE_VOUCHER_SUCCESS, payload: res?.data });
  } catch (err) {
 
    dispatch(
      setAlert(SET_ALERT, {
        message: err.response.data.message,
        alertType: "danger",
      })
    );
    dispatch({
      type: VALIDATE_VOUCHER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteVoucher = (voucherId) => {
  // const voucherId = id.toString();
 
  return async (dispatch) => {
    try {
      const config = { header: { "Content-Type": "application/json" } };
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/voucher/deletevoucher/${voucherId}`,
        config
      );
      dispatch(
        setAlert(SET_ALERT, {
          message: "Voucher was successfully deleted",
          alertType: "success",
        })
      );
      dispatch({ type: DELETE_VOUCHER_SUCCESS, payload: res.data });
      window.location.reload();

    } catch (err) {

    }
  };
};

export const updateVoucher = (id, body) => async (dispatch) => {

  try {
    const config = { header: { "Content-Type": "application/json" } };
    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_ENV}/api/voucher/update/${id}`,
      body,
      config
    );
 
    dispatch(
      setAlert(SET_ALERT, {
        message: "Voucher successfully Updated",
        alertType: "success",
      })
    );
    dispatch(getVoucher());
    // dispatch({ type: ADD_VOUCHER_SUCCESS, payload: res.data.voucher });
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, {
        message: err?.response?.data?.message,
        alertType: "danger",
      })
    );
    // dispatch({ type: ADD_VOUCHER_FAIL, payload: err?.response?.data?.message });
 
  }
};
