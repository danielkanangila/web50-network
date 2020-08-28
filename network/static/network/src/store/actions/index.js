import { createAction } from "../../utils";
import postApi from "../../api/post";
import userApi from "../../api/user";
import user from "../../api/user";

export const FETCHING_POSTS = "FETCHING_POSTS";
export const FETCHING_USER_POSTS = "FETCHING_USER_POSTS";
export const CREATE_POSTS = "CREATE_POSTS";
export const FETCHING_FOLLOWERS = "FETCHING_FOLLOWERS";

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

const getFollowers = (userId) => async (dispatch) =>
  await createAction(
    FETCHING_FOLLOWERS,
    userApi.getFollowers,
    dispatch,
    userId
  );

const getProfileData = (userId) => async (dispatch) => {
  Promise.resolve(
    await createAction(
      FETCHING_FOLLOWERS,
      userApi.getFollowers,
      dispatch,
      userId
    )
  ).then(
    async () =>
      await createAction(
        FETCHING_USER_POSTS,
        postApi.getUserPosts,
        dispatch,
        userId
      )
  );
};

export default {
  getAll,
  create,
  getUserPosts,
  getFollowers,
  getProfileData,
};
