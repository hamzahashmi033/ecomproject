import { useSelector } from "react-redux";
import { SELLER_PRODUCTS } from "../types";

const initState = {
  sellerProd: [],

  error: null,
  loading: true,
};

const sellerProductReducer = (state = initState, action) => {
  switch (action.type) {
    case SELLER_PRODUCTS:
      return {
        ...state,
        sellerProd: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default sellerProductReducer;
