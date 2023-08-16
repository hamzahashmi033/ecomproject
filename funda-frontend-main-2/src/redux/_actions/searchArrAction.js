import { GET_SEARCHED_ITEMS } from "../types";
export const searchFilter = (arrobj) => (dispatch) => {
  dispatch({ type: GET_SEARCHED_ITEMS, payload: arrobj });
};
