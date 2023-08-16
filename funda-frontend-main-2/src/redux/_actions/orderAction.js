import axios from "axios";
import {
  ORDER_LOAD_SUCCESS,
  ORDER_LOAD_FAIL,
  ORDER_SUCCESS,
  ORDER_FAIL,
  SET_ALERT,
  VALIDATE_VOUCHER_FAIL,
  VALIDATE_VOUCHER_SUCCESS,
} from "../types";
import { setAlert } from "./alertAction";

export const postOrder = (order, userID) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/orders/addOrder/${userID}`,
        order,
        config
      );

      dispatch(
        setAlert(SET_ALERT, {
          message: "Order was successfully place",
          alertType: "success",
        })
      );
      dispatch({ type: ORDER_SUCCESS, payload: res?.data });
      dispatch({ type: VALIDATE_VOUCHER_SUCCESS, payload: [] });
      localStorage.setItem("CartList", "[]");
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err?.response?.data.message,
          alertType: "danger",
        })
      );
      dispatch({ type: ORDER_FAIL, payload: err?.response?.data.message });
    }
  };
};

export const getOrderForUsers = (id) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/orders/getOrderbyuser/${id}`,
        config
      );

      dispatch({ type: ORDER_LOAD_SUCCESS, payload: res?.data?.result });
    } catch (err) {
      dispatch({ type: ORDER_LOAD_FAIL, payload: err?.response?.data.message });
    }
  };
};
export const getOrderByUserID = (userId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/orders/getOrderbyuser/${userId}`,
        config
      );

      dispatch({ type: ORDER_LOAD_SUCCESS, payload: res?.data?.result });
    } catch (err) {
      dispatch({ type: ORDER_LOAD_SUCCESS, payload: [] });
      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: err?.response?.data.message,
      //     alertType: "danger",
      //   })
      // );
      dispatch({ type: ORDER_LOAD_FAIL, payload: err?.response?.data.message });
    }
  };
};

export const getOrdersForSeller = (sellerId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/orders/getOrderBySeller/${sellerId}`,
        config
      );

      dispatch({
        type: ORDER_LOAD_SUCCESS,
        payload: res?.data?.seller_order_details,
      });
    } catch (err) {}
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/orders/getAllOrders`,
        config
      );

      dispatch({ type: ORDER_LOAD_SUCCESS, payload: res?.data?.orders });
    } catch (err) {}
  };
};

export const changeOrderStatus = (status, orderId, userId) => {
  console.log("User Id: ", userId);
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENV}/api/orders/changeStatus/${orderId}`,
        { status: status },
        config
      );
      if (status === "Completed") {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_ENV}/api/orders/orderMail/${userId}`,
          { orderID: orderId },
          config
        );
      }
      dispatch({ type: ORDER_SUCCESS, payload: res?.data?.order });
      dispatch(
        setAlert(SET_ALERT, {
          message: "Order status was updated successfully",
          alertType: "success",
        })
      );
      window.location.reload();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err?.response?.data.message,
          type: "danger",
        })
      );
    }
  };
};
