import axios from "axios";
import { setAlert } from "./alertAction";
import { SET_ALERT, GET_BLOG, GET_SINGLE_BLOG } from "../types";

export const postBlog = (blog, adminId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/blog/add/${adminId}`,
        blog,
        config
      );

      dispatch(
        setAlert(SET_ALERT, {
          message: "Blog created Successfully",
          alertType: "success",
        })
      );
      dispatch(getBlog());

      //   dispatch(
      //     setAlert(SET_ALERT, {
      //       message: "Order was successfully place",
      //       alertType: "success",
      //     })
      //   );
      //   dispatch({ type: ORDER_SUCCESS, payload: res?.data });
      //   dispatch({ type: VALIDATE_VOUCHER_SUCCESS, payload: [] });
      //   localStorage.setItem("CartList", "[]");
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: "Blog not posted",
          alertType: "danger",
        })
      );
      //   dispatch({ type: ORDER_FAIL, payload: err?.response?.data.message });
    }
  };
};
// delete blogs
export const deleteblog = (id) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/blog/removeblog/${id}`,

        config
      );

      dispatch(
        setAlert(SET_ALERT, {
          message: "Blog Deleted Successfully",
          alertType: "success",
        })
      );
      dispatch(getBlog());

      //   dispatch(
      //     setAlert(SET_ALERT, {
      //       message: "Order was successfully place",
      //       alertType: "success",
      //     })
      //   );
      //   dispatch({ type: ORDER_SUCCESS, payload: res?.data });
      //   dispatch({ type: VALIDATE_VOUCHER_SUCCESS, payload: [] });
      //   localStorage.setItem("CartList", "[]");
    } catch (err) {
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

// get blogs

export const getBlog = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/blog/getall`,

        config
      );

      dispatch({ type: GET_BLOG, payload: res?.data?.blog });

      //   dispatch(
      //     setAlert(SET_ALERT, {
      //       message: "Order was successfully place",
      //       alertType: "success",
      //     })
      //   );
      //   dispatch({ type: ORDER_SUCCESS, payload: res?.data });
      //   dispatch({ type: VALIDATE_VOUCHER_SUCCESS, payload: [] });
      //   localStorage.setItem("CartList", "[]");
    } catch (err) {
      dispatch({ type: GET_BLOG, payload: [] });

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
export const getSingleBlog = (id) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/blog/getsingle/${id}`,

        config
      );

      // dispatch(getBlog());
      dispatch({ type: GET_SINGLE_BLOG, payload: res?.data?.blog });
    } catch (err) {
      dispatch({ type: GET_SINGLE_BLOG, payload: {} });

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
