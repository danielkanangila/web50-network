import { FETCHING_FOLLOWERS } from "../actions";

import { ReducerSwitch } from "./../../utils";

const initialState = {
  data: [],
  loading: false,
  errors: null,
};

export const users = (state = initialState, action) => {
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
    errors: action.payload,
  });

  // Adding Actions
  mySwitch.add(FETCHING_FOLLOWERS);

  return mySwitch.switch(action);
};
