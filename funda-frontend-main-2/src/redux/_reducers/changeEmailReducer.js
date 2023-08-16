import {
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
  CLEAR_ERRORS,
} from "../types";

const initState = {
  changeEmail : null,
  error: null,
  loading: true,
};

const changeEmailReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
      };
    case CHANGE_EMAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default changeEmailReducer;
