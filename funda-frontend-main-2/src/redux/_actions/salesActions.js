import axios from "axios";
import { GET_ALL_DEALS, GET_POSTED_DEAL, SET_ALERT } from "../types";
import { setAlert } from "./alertAction";
import { getProductsByCreatedBy } from "./productAction";
export const postSale = (sale) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/deal/adddeal`,
        sale,
        config
      );

      dispatch({
        type: GET_POSTED_DEAL,
        payload: JSON.parse(res?.config?.data),
      });
      dispatch(
        setAlert(SET_ALERT, {
          message: "Sale created Successfully",
          alertType: "success",
        })
      );
    } catch (err) {}
  };
};
export const deleteDeal = (saleId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/deal/removedeal/${saleId}`,
        config
      );
      // dispatch({
      //   type: GET_POSTED_DEAL,
      //   payload: JSON.parse(res?.config?.data),
      // });

      dispatch(
        setAlert(SET_ALERT, {
          message: "Sale Deleted Successfully",
          alertType: "success",
        })
      );
      dispatch(getDeal());
    } catch (err) {}
  };
};
export const updateDeal = (saleId, saleobj) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENV}/api/deal/updatedeal/${saleId}`,
        saleobj,
        config
      );
      // dispatch({
      //   type: GET_POSTED_DEAL,
      //   payload: JSON.parse(res?.config?.data),
      // });

      dispatch(
        setAlert(SET_ALERT, {
          message: "Sale Updated Successfully",
          alertType: "success",
        })
      );
      dispatch(getDeal());
    } catch (err) {}
  };
};
export const getDeal = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/deal/getdeal`,

        config
      );

      dispatch({ type: GET_ALL_DEALS, payload: res?.data?.sale });

      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: "Order was successfully place",
      //     alertType: "success",
      //   })
      // );
    } catch (err) {
      //   dispatch({ type: GET_BLOG, payload: [] });
      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: "Blog not posted",
      //     alertType: "danger",
      //   })
      // );
      //   dispatch({ type: ORDER_FAIL, payload: err?.response?.data.message });
    }
  };
};

// **********************************// products
export const addProductToDeal = (saleId, productId, sellerid) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENV}/api/deal/addproduct/${saleId}`,
        { productId: productId },
        config
      );

      // dispatch({ type: GET_ALL_DEALS, payload: res?.data?.sale });

      dispatch(
        setAlert(SET_ALERT, {
          message: "Product Added to Sale Successfully",
          alertType: "success",
        })
      );
      dispatch(getProductsByCreatedBy(sellerid));
      dispatch(getDeal());
    } catch (err) {
      //   dispatch({ type: GET_BLOG, payload: [] });
      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: "Blog not posted",
      //     alertType: "danger",
      //   })
      // );
      //   dispatch({ type: ORDER_FAIL, payload: err?.response?.data.message });
    }
  };
};

export const removeProductToDeal = (saleId, productID, sellerid) => {
  const config = { header: { "Content-Type": "application/json" } };
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/deal/removeproduct/${saleId}`,

        { data: { productID: productID } },
        config
      );

      // dispatch({ type: GET_ALL_DEALS, payload: res?.data?.sale });

      dispatch(
        setAlert(SET_ALERT, {
          message: "Product Deleted From Sale Successfully",
          alertType: "success",
        })
      );
      dispatch(getProductsByCreatedBy(sellerid));
    } catch (err) {
      //   dispatch({ type: GET_BLOG, payload: [] });
      // dispatch(
      //   setAlert(SET_ALERT, {
      //     message: "Blog not posted",
      //     alertType: "danger",
      //   })
      // );
      //   dispatch({ type: ORDER_FAIL, payload: err?.response?.data.message });
    }
  };
};
