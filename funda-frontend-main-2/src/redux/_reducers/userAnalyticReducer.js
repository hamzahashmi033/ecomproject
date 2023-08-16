import { GET_ANALYTICS } from "../types";

const initState = {
  adminAnalytic: {},
};

const getUsersAnalytic = (state = initState, action) => {
  switch (action.type) {
    case GET_ANALYTICS: {
      return {
        ...state,
        adminAnalytic: action.payload,
      };
    }

    default:
      return state;
  }
};

export default getUsersAnalytic;
