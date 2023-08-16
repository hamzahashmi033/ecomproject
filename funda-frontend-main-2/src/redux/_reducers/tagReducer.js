import {
  TAG_SUCCESS,
  TAG_FAIL,
  TAG_UPDATE_SUCCESS,
  TAG_UPDATE_FAIL,
  TAG_DELETE_SUCCESS,
  TAG_DELETE_FAIL,
  TAG_LOAD_SUCCESS,
  TAG_LOAD_FAIL,
  TAG_EMPTY_SET,
  CLEAR_ERRORS,
  GET_PRODUCTS_BY_TAGS,
} from "../types";

const initState = {
  tags: [],
  tagProducts: {},
  tag: null,
  error: null,
  loading: true,
};

const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case TAG_LOAD_SUCCESS:
      return {
        ...state,
        tags: action.payload,
        loading: false,
      };
    case GET_PRODUCTS_BY_TAGS:
      return {
        ...state,
        tagProducts: action.payload,
        loading: false,
      };
    case TAG_LOAD_FAIL:
      return {
        ...state,
        tags: [],
        error: action.payload,
      };
    case TAG_SUCCESS:
    case TAG_UPDATE_SUCCESS:
      return {
        ...state,
      };
    case TAG_DELETE_SUCCESS:
      return {
        ...state,
      };
    case TAG_FAIL:
    case TAG_UPDATE_FAIL:
    case TAG_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case TAG_EMPTY_SET:
      return {
        ...state,
        tags: [],
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

export default tagReducer;
