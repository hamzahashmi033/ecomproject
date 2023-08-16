import { REMOVE_ALERT } from "../types";

export const setAlert =
  (type, payload, timeout = 3000) =>
  (dispatch) => {
    const id = Math.floor(Math.random() * 100);
    dispatch({ type: type, payload: { payload, id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };
