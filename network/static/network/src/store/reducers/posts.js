import {
  FETCHING_POSTS_START,
  FETCHING_POSTS_SUCCESS,
  FETCHING_POSTS_FAILURE,
  CREATE_POSTS_START,
  CREATE_POSTS_SUCCESS,
  CREATE_POSTS_FAILURE,
} from "../actions";

const initialState = {
  data: [],
  loading: false,
  errors: null,
};

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_POSTS_START: {
      return {
        ...state,
        loading: true,
        errors: null,
      };
    }
    case FETCHING_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errors: null,
      };
    case FETCHING_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CREATE_POSTS_START: {
      return {
        ...state,
        loading: true,
        errors: null,
      };
    }
    case CREATE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
        errors: null,
      };
    case CREATE_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
