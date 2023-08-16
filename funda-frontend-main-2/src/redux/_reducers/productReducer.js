import { useSelector } from "react-redux";
import {
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_LOAD_SUCCESS,
  PRODUCT_LOAD_FAIL,
  PRODUCT_EMPTY_SET,
  CLEAR_ERRORS,
  SELLER_PRODUCTS,
} from "../types";

const initState = {
  products: [],
  sellerProd: [],
  product: null,
  error: null,
  loading: true,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_LOAD_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    // case SELLER_PRODUCTS:
    //   return {
    //     ...state,
    //     sellerProd: action.payload,
    //     loading: false,
    //   };
    case PRODUCT_LOAD_FAIL:
      return {
        ...state,
        products: [],
        error: action.payload,
      };
    case PRODUCT_SUCCESS:
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
      };
    case PRODUCT_FAIL:
    case PRODUCT_UPDATE_FAIL:
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case PRODUCT_EMPTY_SET:
      return {
        ...state,
        products: [],
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

export default productReducer;
