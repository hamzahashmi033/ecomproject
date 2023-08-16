import { SET_ALERT, REMOVE_ALERT } from "../types";

const initialState = {
  id: null,
  alertType: "",
  message: "",
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        id: action.payload.id,
        message: action.payload.payload.message,
        alertType: action.payload.payload.alertType,
      };
    case REMOVE_ALERT:
      return {
        id: null,
        alertType: "",
        message: "",
      };
    default:
      return state;
  }
};

export default alertReducer;
