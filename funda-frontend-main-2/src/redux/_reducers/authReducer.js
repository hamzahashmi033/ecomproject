import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGGED_USER_SUCCESS,
  LOGGED_USER_FAIL,
  RESET_SUCCESS,
  RESET_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_MODAL,
} from "../types";

const initState = {
  user: null,
  error: null,
  verify: null,
  message: null,
  logined: false,
  loading: true,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_MODAL:
      return {
        ...state,
        logined: action.payload,
      };
    case RESET_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        verify: action.payload.message,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: { id: action.payload.user._id, role: action.payload.user.role },
        })
      );
      return {
        ...state,
        user: action.payload.user,
      };
    case LOGGED_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        loading: false,
      };
    case LOGOUT:
      localStorage.clear();
      window.location.href = "/";
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGGED_USER_FAIL:
      return {
        ...state,
        error: null,
        user: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case RESET_FAIL:
    case VERIFY_FAIL:
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
