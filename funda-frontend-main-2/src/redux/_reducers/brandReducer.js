import {
  BRAND_SUCCESS,
  BRAND_FAIL,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_DELETE_SUCCESS,
  BRAND_DELETE_FAIL,
  BRAND_LOAD_SUCCESS,
  BRAND_LOAD_FAIL,
  BRAND_EMPTY_SET,
  CLEAR_ERRORS,
} from "../types";

const initState = {
  brands: [],
  brand: null,
  error: null,
  loading: true,
};

const brandReducer = (state = initState, action) => {
  switch (action.type) {
    case BRAND_LOAD_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        loading: false,
      };
    case BRAND_LOAD_FAIL:
      return {
        ...state,
        brands: [],
        error: action.payload,
      };
    case BRAND_SUCCESS:
    case BRAND_UPDATE_SUCCESS:
      return {
        ...state,
      };
    case BRAND_DELETE_SUCCESS:
      return {
        ...state,
      };
    case BRAND_FAIL:
    case BRAND_UPDATE_FAIL:
    case BRAND_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case BRAND_EMPTY_SET:
      return {
        ...state,
        brands: [],
        loading: false,
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

export default brandReducer;
