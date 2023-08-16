import {
  REVIEW_PRODUCT_FAIL,
  REVIEW_PRODUCT_SUCCESS,
  REVIEW_ADD_FAIL,
  REVIEW_ADD_SUCCESS,
  REVIEW_ORDER_COMPLETE_FAIL,
  REVIEW_ORDER_COMPLETE_SUCCESS,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";
import { getProductById } from "./productAction";

export const addReview = (prodId, Review, userId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/product/postReview/${prodId}`,
        { Review, userId },
        config
      );

      dispatch({ type: REVIEW_ADD_SUCCESS, payload: res.data.Review });
      dispatch(
        setAlert(SET_ALERT, {
          message: "Review added succesfully",
          alertType: "success",
        })
      );

      window.location.reload();
    } catch (err) {
      dispatch({
        type: REVIEW_ADD_FAIL,
        payload: err.response.data.message,
      });
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
    }
  };
};

export const getProductReview = (prodID) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/review/getProduct/${prodID}`,
        config
      );

      dispatch({
        type: REVIEW_PRODUCT_SUCCESS,
        payload: res?.data,
      });
    } catch (err) {
      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: err.response.data.message,
      //     alertType: "danger",
      //   })
      // );
      dispatch({
        type: REVIEW_PRODUCT_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

export const orderCompleteReview = (userID) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/review/identifyProduct/${userID}`,
        config
      );

      dispatch({
        type: REVIEW_ORDER_COMPLETE_SUCCESS,
        payload: res?.data?.product_id,
      });
    } catch (err) {
      dispatch({
        type: REVIEW_ORDER_COMPLETE_FAIL,
        payload: err?.response?.data?.message,
      });
      dispatch(
        setAlert(SET_ALERT, {
          message: err?.response?.data?.message,
          alertType: "danger",
        })
      );
    }
  };
};
