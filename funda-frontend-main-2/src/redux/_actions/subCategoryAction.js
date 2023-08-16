import {
  SUBCATEGORY_SUCCESS,
  SUBCATEGORY_FAIL,
  SUBCATEGORY_LOAD_SUCCESS,
  SUBCATEGORY_LOAD_FAIL,
  SUBCATEGORY_EMPTY_SET,
  SUBCATEGORY_UPDATE_SUCCESS,
  SUBCATEGORY_UPDATE_FAIL,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_SUCCESS,
  SET_ALERT,
  SUBCATEGORY_SINGLE_LOAD_SUCCESS,
  SUBCATEGORY_SINGLE_LOAD_FAIL,
} from "../types";
import axios from "axios";
import { setAlert } from "./alertAction";

export const addSubCategory = (categoryId, subCategoryName) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/subcategory/createsubcategory`,
        { categoryId, subCategoryName },
        config
      );

      dispatch(
        setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
      );
      dispatch({ type: SUBCATEGORY_SUCCESS, payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, {
          message: err.response.data.message,
          alertType: "danger",
        })
      );
      dispatch({ type: SUBCATEGORY_FAIL, payload: err.response.data.message });
    }
  };
};

export const getSubCategory = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/subcategory/`,
        config
      );

      dispatch({ type: SUBCATEGORY_LOAD_SUCCESS, payload: res?.data?.data });
    } catch (err) {
      dispatch({
        type: SUBCATEGORY_LOAD_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };
};

export const getSubCategoryById = (id) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/subcategory/` + id,
        config
      );

      dispatch({ type: SUBCATEGORY_SINGLE_LOAD_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: SUBCATEGORY_SINGLE_LOAD_FAIL,
        payload: err.response?.data?.message,
      });
    }
  };
};

export const getSubCategoryByCategoryId = (CategoryId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/subcategory/getSubCategoryByCategoryId/` +
          CategoryId,
        config
      );

      if (res.data === []) {
        dispatch({ type: SUBCATEGORY_EMPTY_SET, payload: res.data });
      } else {
        dispatch({ type: SUBCATEGORY_LOAD_SUCCESS, payload: res.data });
      }
    } catch (err) {
      dispatch({
        type: SUBCATEGORY_LOAD_FAIL,
        payload: err.response.data.message,
      });
    }
  };
};

export const updateSubCategory =
  (id, subCategoryName, categoryId, subCategoryComission) =>
  async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BACKEND_ENV}/api/subCategory/` + id,
        { subCategoryName, categoryId, subCategoryComission },
        config
      );

      dispatch(
        setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
      );
      dispatch({ type: SUBCATEGORY_UPDATE_SUCCESS, payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch(
        setAlert(SET_ALERT, { message: err.message, alertType: "danger" })
      );
      dispatch({
        type: SUBCATEGORY_UPDATE_FAIL,
        payload: err.message,
      });
    }
  };

export const deleteSubCategory = (id) => async (dispatch) => {
  const config = { header: { "Content-Type": "application/json" } };
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_ENV}/api/subcategory/` + id,
      { id },
      config
    );
    dispatch(
      setAlert(SET_ALERT, { message: res.data.message, alertType: "success" })
    );
    window.location.reload();
    dispatch({ type: SUBCATEGORY_DELETE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch(
      setAlert(SET_ALERT, { message: err.message, alertType: "danger" })
    );
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};
