import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from "../types";

const initState = {
  changePassword : null,
  error: null,
  loading: true,
};

const changePasswordReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
      };
    case CHANGE_PASSWORD_FAIL:
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

export default changePasswordReducer;
