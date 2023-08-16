import { GET_BLOG } from "../types";
import { GET_SINGLE_BLOG } from "../types";
const initState = {
  Blogs: [],
  loading: true,
  single_blog: {
    single_blog: {},
    loading: true,
  },
};

const getallblogs = (state = initState, action) => {
  switch (action.type) {
    case GET_BLOG: {
      return {
        ...state,

        Blogs: action.payload,
        loading: false,
      };
    }
    case GET_SINGLE_BLOG: {
      return {
        ...state,

        single_blog: { single_blog: action.payload, loading: false },
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default getallblogs;
