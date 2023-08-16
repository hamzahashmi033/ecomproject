import {
  SENDCODE_SUCCESS,
  SENDCODE_FAIL,
  VERIFYCODE_SUCCESS,
  VERIFYCODE_FAIL,
  CLEAR_ERRORS,
} from "../types";

const initState = {
  sms: {},
  error: null,
  message: null,
};

const smsServiceReducer = (state = initState, action) => {
  switch (action.type) {
    case SENDCODE_SUCCESS:
    case VERIFYCODE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case SENDCODE_FAIL:
    case VERIFYCODE_FAIL:
      return { ...state };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return { ...state };
  }
};

export default smsServiceReducer;
