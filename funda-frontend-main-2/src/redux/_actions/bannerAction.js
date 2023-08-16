import {
  ADD_BANNER_FAIL,
  ADD_BANNER_SUCCESS,
  BANNER_LOAD_FAIL,
  BANNER_LOAD_SUCCESS,
  BANNER_REMOVE_FAIL,
  BANNER_REMOVE_SUCCESS,
  SET_ALERT,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const addBanner = (bannerImage) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "multipart/form-data" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/banner/add`,
        bannerImage,
        config
      );

      dispatch(
        setAlert(SET_ALERT, {
          message: "Banner was successfully uploaded",
          alertType: "success",
        })
      );
      dispatch(getBanner());
      // window.location.reload();
    } catch (err) {}
  };
};

export const getBanner = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/banner/get`,
        config
      );

      dispatch({ type: BANNER_LOAD_SUCCESS, payload: res?.data?.Banners });
    } catch (err) {
      dispatch({ type: BANNER_LOAD_FAIL, payload: err });
    }
  };
};

export const removeBanner = (bannerID, url) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/upload/delete`,
        { url },
        config
      );
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/banner/remove/${bannerID}`,
        config
      );
      //dispatch({type : BANNER_REMOVE_SUCCESS , payload : action.payload})
      dispatch(
        setAlert(SET_ALERT, {
          message: "Banner was successfully removed",
          alertType: "success",
        })
      );
      dispatch(getBanner());
      // window.location.reload();
    } catch (err) {}
  };
};
