import { GET_ALL_DEALS, GET_POSTED_DEAL } from "../types";
const initState = {
  deals: [],
  loading: true,
  singledeal: {},
};

const getdeals = (state = initState, action) => {
  
  switch (action.type) {
    case GET_ALL_DEALS: {
      return {
        ...state,

        deals: action.payload,
        loading: false,
      };
    }
    case GET_POSTED_DEAL: {
      return {
        ...state,

        deals: [...state?.deals, action.payload],
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default getdeals;
