import axios from "axios";
import {
  LOAD_SELLER_ANALYTICS_FAIL,
  LOAD_SELLER_ANALYTICS_SUCCESS,
  SET_ALERT,
} from "../types";
import { setAlert } from "../_actions/alertAction";
// import SellerId
export const getSellerAnalytics = (sellerID) => {
  
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/user/sellerDetails/${sellerID}`,
        config
      );
      
      dispatch({ type: LOAD_SELLER_ANALYTICS_SUCCESS, payload: res.data });
    } catch (err) {
 
      dispatch({
        type: LOAD_SELLER_ANALYTICS_FAIL,
        payload: err?.response?.data.message,
      });
      dispatch(
        setAlert({ message: err?.response?.data?.message, alertType: "danger" })
      );
    }
  };
};
