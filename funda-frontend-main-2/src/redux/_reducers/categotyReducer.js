import {
  CATEGORY_LOAD_SUCCESS,
  CATEGORY_LOAD_FAIL,
  CATEGORY_EMPTY_SET,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_SINGLE_LOAD_SUCCESS,
  CATEGORY_SINGLE_LOAD_FAIL,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CLEAR_ERRORS,
} from "../types";

const initState = {
  categories: [],
  category: null,
  error: null,
  loading: true,
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case CATEGORY_LOAD_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    case CATEGORY_LOAD_FAIL:
      return {
        ...state,
        categories: [],
        error: action.payload,
      };
    case CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
      };
    case CATEGORY_UPDATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
      };
    case CATEGORY_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CATEGORY_EMPTY_SET:
      return {
        ...state,
        categories: [],
        loading: false,
      };
    case CATEGORY_SINGLE_LOAD_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case CATEGORY_SINGLE_LOAD_FAIL:
      return {
        ...state,
        category: null,
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

export default categoryReducer;
