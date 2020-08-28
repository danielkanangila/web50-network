import { createAction } from "../../utils";
import postApi from "../../api/post";

export const FETCHING_POSTS = "FETCHING_POSTS";
export const FETCHING_USER_POSTS = "FETCHING_USER_POSTS";
export const CREATE_POSTS = "CREATE_POSTS";

const getAll = () => async (dispatch) =>
  await createAction(FETCHING_POSTS, postApi.getAll, dispatch);

const getUserPosts = (userId) => async (dispatch) =>
  await createAction(
    FETCHING_USER_POSTS,
    postApi.getUserPosts,
    dispatch,
    userId
  );

const create = (data) => async (dispatch) =>
  await createAction(CREATE_POSTS, postApi.create, dispatch, data);

export default {
  getAll,
  create,
  getUserPosts,
};
