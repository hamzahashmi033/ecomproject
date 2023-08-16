import {
  WISHLIST_DELETE_FAIL,
  WISHLIST_DELETE_SUCCESS,
  WISHLIST_FAIL,
  WISHLIST_SUCCESS,
  WISHLIST_LOAD_FAIL,
  WISHLIST_LOAD_SUCCESS,
  WISHLIST_SAVE_SUCCESS,
  WISHLIST_SAVE_FAIL,
} from "../types";

const initState = {
  wishList: [],
  userWishList: [],
  userWishProd: [],
  error: null,
  loading: true,
};

const wishlistReducer = (state = initState, action) => {
  switch (action.type) {
    case WISHLIST_LOAD_SUCCESS:
      return {
        ...state,
        userWishProd: action?.payload,
        loading: false,
      };
    case WISHLIST_LOAD_FAIL:
      return {
        ...state,
        userWishList: [],
        loading: false,
        error: action.payload,
      };
    case WISHLIST_SUCCESS:
      return {
        ...state,
      };
    case WISHLIST_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case WISHLIST_DELETE_SUCCESS: {
      return {
        ...state,
      };
    }
    case WISHLIST_DELETE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case WISHLIST_SAVE_SUCCESS: {
      return {
        wishList: [],
        userWishList: [],
        loading: true,
      };
    }
    case WISHLIST_SAVE_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default wishlistReducer;
