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

import axios from "axios";
import { setAlert } from "../_actions/alertAction";

export const addWishItem = (wishItem) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wishlist/`,
        wishItem,
        config
      );

      dispatch({ type: WISHLIST_SUCCESS, payload: res?.data });
    } catch (err) {
      dispatch({
        type: WISHLIST_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

export const deleteWishItem = (wishItemID) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wishlist/${wishItemID}`,
        config
      );

      dispatch({ type: WISHLIST_DELETE_SUCCESS, payload: res?.data });
    } catch (err) {
      dispatch({
        type: WISHLIST_DELETE_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

//   export const getWishList = (userID) => {
//     return async (dispatch) => {
//       const config = { header: { "Content-Type": "application/json" } };
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_BACKEND_ENV}/api/wishList`,
//           config
//         );

//         dispatch({ type: WISHLIST_LOAD_SUCCESS, payload: res?.data });
//       } catch (err) {
//         dispatch({
//           type: WISHLIST_LOAD_FAIL,
//           payload: err?.response?.data?.message,
//         });
//       }
//     };
//   };

// export const getWishByUser = (userID) => {
//   return async (dispatch) => {
//     const config = { header: { "Content-Type": "application/json" } };
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BACKEND_ENV}/api/wishlist/${userID}`,
//         config
//       );
//       dispatch({ type: WISHLIST_LOAD_SUCCESS, payload: res?.data });
//       //localStorage.setItem("WishList", res?.data)
//     } catch (err) {
//       dispatch({
//         type: WISHLIST_LOAD_FAIL,
//         payload: err?.response?.data?.message,
//       });
//     }
//   };
// };
export const getWishByUser = (userID) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wish/wishlistofuser/${userID}`,
        config
      );

      dispatch({ type: WISHLIST_LOAD_SUCCESS, payload: res?.data?.data });
      //localStorage.setItem("WishList", res?.data)
    } catch (err) {
      dispatch({
        type: WISHLIST_LOAD_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

export const addProductAfterLogin = (arrProductId, userID) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wish/addproductlogin`,

        {
          arrProductId,
          userID,
        },
        config
      );

      // dispatch({ type: WISHLIST_LOAD_SUCCESS, payload: res?.data?.data });
      //localStorage.setItem("WishList", res?.data)
    } catch (err) {
      dispatch({
        type: WISHLIST_LOAD_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};
export const deleteProdFromWish = (productId, userId) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wish/removeproductwish/${userId}`,
        { data: { prodId: productId } },
        config
      );

      // dispatch({ type: WISHLIST_DELETE_SUCCESS, payload: res?.data });
    } catch (err) {
      dispatch({
        type: WISHLIST_DELETE_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};

export const addwisheditem = (wishedItem) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wish/addwish`,
        wishedItem,
        config
      );
    } catch (err) {
      // dispatch({
      //   type: WISHLIST_LOAD_FAIL,
      //   payload: err?.response?.data?.message,
      // });
    }
  };
};

export const saveWishListByUser = (userID, wishListIds) => {
  return async (dispatch) => {
    const config = { header: { "Content-Type": "application/json" } };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENV}/api/wishlist/save/${userID}`,
        { prodID: wishListIds },
        config
      );
      dispatch({ type: WISHLIST_SAVE_SUCCESS, payload: res?.data });
      window.location.href = "/";
    } catch (err) {
      dispatch({
        type: WISHLIST_SAVE_FAIL,
        payload: err?.response?.data?.message,
      });
    }
  };
};
