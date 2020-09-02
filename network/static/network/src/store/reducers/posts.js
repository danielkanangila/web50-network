import { FETCHING_POSTS, FETCHING_USER_POSTS, CREATE_POSTS } from "../actions";

import { ReducerSwitch } from "./../../utils";

const initialState = {
  data: [],
  loading: false,
  errors: null,
};

export const posts = (state = initialState, action) => {
  const mySwitch = new ReducerSwitch();
  // Action handler
  mySwitch.start = () => ({
    ...state,
    loading: true,
    errors: null,
  });
  mySwitch.success = () => {
    return {
      ...state,
      loading: false,
      data: action.payload,
      errors: null,
    };
  };
  mySwitch.failure = () => ({
    ...state,
    loading: false,
    data: [],
    errors: action.payload,
  });

  // Adding Actions
  mySwitch.add(FETCHING_POSTS);
  mySwitch.add(FETCHING_USER_POSTS);
  mySwitch.add(CREATE_POSTS);

  // Update posts on success created handler
  mySwitch.update(`${CREATE_POSTS}_SUCCESS`, () => ({
    ...state,
    loading: false,
    errors: null,
  }));

  return mySwitch.switch(action);
};
