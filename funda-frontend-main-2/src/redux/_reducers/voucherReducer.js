import {
  ADD_VOUCHER_SUCCESS,
  ADD_VOUCHER_FAIL,
  LOAD_VOUCHERS_SUCCESS,
  LOAD_VOUCHERS_FAIL,
  GET_VOUCHER_SUCCESS,
  GET_VOUCHER_FAIL,
  VALIDATE_VOUCHER_SUCCESS,
  VALIDATE_VOUCHER_FAIL,
  DELETE_VOUCHER_SUCCESS,
  DELETE_VOUCHER_FAIL,
} from "../types";

const initState = {
  vouchers: [],
  voucher: {},
  validateVoucher: {},
  loading: true,
  error: null,
};

const voucherReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_VOUCHER_SUCCESS:
      return {
        ...state,
        voucher: action.payload,
      };
    case ADD_VOUCHER_FAIL:
      return {
        ...state,
        voucher: null,
        error: action.payload,
      };
    case LOAD_VOUCHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        vouchers: action.payload,
      };
    case LOAD_VOUCHERS_FAIL:
      return {
        ...state,
        vouchers: [],
        loading: false,
        error: action.payload,
      };
    case GET_VOUCHER_SUCCESS:
      return {
        ...state,
        voucher: action.payload,
        loading: false,
      };
    case GET_VOUCHER_FAIL:
      return {
        ...state,
        voucher: null,
        error: action.payload,
      };
    case VALIDATE_VOUCHER_SUCCESS:
      return {
        ...state,
        validateVoucher: action.payload,
        loading: false,
        error: null,
      };
    case VALIDATE_VOUCHER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        validateVoucher: {},
      };
    case DELETE_VOUCHER_SUCCESS:
      return {
        ...state,
      };
    case DELETE_VOUCHER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default voucherReducer;
