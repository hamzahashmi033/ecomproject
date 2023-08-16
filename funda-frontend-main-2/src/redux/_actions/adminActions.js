import axios from "axios";
import { GET_ANALYTICS } from "../types";
export const getUsersAnalytic = () => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/user/adminDetails`,

        config
      );

      dispatch({ type: GET_ANALYTICS, payload: res?.data });
    } catch (err) {
      //   dispatch({ type: GET_BLOG, payload: [] });
    }
  };
};
