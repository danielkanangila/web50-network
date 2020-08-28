import { combineReducers } from "redux";

import { posts } from "./posts";
import { users } from "./users";

const rootReducer = combineReducers({
  posts,
  users,
});

export default rootReducer;
