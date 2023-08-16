import {
  ADD_BANNER_FAIL,
  ADD_BANNER_SUCCESS,
  BANNER_LOAD_FAIL,
  BANNER_LOAD_SUCCESS,
  BANNER_REMOVE_FAIL,
  BANNER_REMOVE_SUCCESS,
} from "../types";

const initState = {
  banners: [],
  banner: null,
  error: null,
  loading: true,
};

const bannerReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_BANNER_SUCCESS:
      return {
        ...state,
        banner: action.payload,
        loading: false,
      };
    case ADD_BANNER_FAIL:
      return {
        ...state,
        banner: null,
        error: action.payload,
      };
    case BANNER_LOAD_SUCCESS:
      return {
        ...state,
        banners: action.payload,
        loading: false,
      };
    case BANNER_LOAD_FAIL:
      return {
        ...state,
        banners: [],
        error: action.payload,
        loading: false,
      };
    case BANNER_REMOVE_SUCCESS:
      return {
        ...state,
        banners: action.payload,
        loading: false,
      };
    case BANNER_REMOVE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default bannerReducer;
