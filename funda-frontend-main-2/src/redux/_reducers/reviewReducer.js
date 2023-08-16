import {
  REVIEW_PRODUCT_FAIL,
  REVIEW_PRODUCT_SUCCESS,
  REVIEW_ADD_FAIL,
  REVIEW_ADD_SUCCESS,
  REVIEW_ORDER_COMPLETE_FAIL,
  REVIEW_ORDER_COMPLETE_SUCCESS,
} from "../types";

const initState = {
  reviews: [],
  completedOrder: [],
  review: null,
  error: null,
  loading: true,
};

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case REVIEW_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case REVIEW_ADD_FAIL:
      return {
        ...state,
        review: null,
        error: action.payload,
        loading: false,
      };
    case REVIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    case REVIEW_PRODUCT_FAIL:
      return {
        ...state,
        reviews: [],
        error: action.payload,
        loading: false,
      };
    case REVIEW_ORDER_COMPLETE_SUCCESS:
      return {
        ...state,
        completedOrder: action.payload,
        loading: false,
      };
    case REVIEW_ORDER_COMPLETE_FAIL:
      return {
        ...state,
        completedOrder: [],
        error: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reviewReducer;
