import {
  LOAD_SELLER_ANALYTICS_SUCCESS,
  LOAD_SELLER_ANALYTICS_FAIL,
} from "../types";

const init = {
  sellerAnalytics: {},
  loading: true,
};

export const sellerAnalyticsReducer = (state = init, action) => {
  switch (action.type) {
    case LOAD_SELLER_ANALYTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        sellerAnalytics: action.payload,
      };
    case LOAD_SELLER_ANALYTICS_FAIL:
      return {
        ...state,
        sellerAnalytics: {},
      };
    default:
      return state;
  }
};
