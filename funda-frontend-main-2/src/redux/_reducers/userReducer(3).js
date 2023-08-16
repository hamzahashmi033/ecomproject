import {
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_SINGLE_LOAD_SUCCESS,
  USER_SINGLE_LOAD_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../types";
const initState = {
  users: [],
  user: null,
  error: null,
  loading: true,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case USER_SINGLE_LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
      };
    case USER_LOAD_FAIL:
    case USER_SINGLE_LOAD_FAIL:
    case USER_UPDATE_FAIL:
    case USER_UPDATE_SUCCESS:
    case USER_DELETE_FAIL:
    case USER_DELETE_SUCCESS:
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
