import { createAction, request } from "../../utils";
import postApi from "../../api/post";
import userApi from "../../api/user";

export const FETCHING_POSTS = "FETCHING_POSTS";
export const FETCHING_USER_POSTS = "FETCHING_USER_POSTS";
export const FETCHING_FOLLOWERS = "FETCHING_FOLLOWERS";
export const FETCHING_PROFILE_INFO = "FETCHING_PROFILE_INFO";
export const CREATE_POSTS = "CREATE_POSTS";
export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const FETCHING_TIMELINE = "FETCHING_TIMELINE";

const getAllPosts = () => async (dispatch) =>
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
  dispatch({ type: `${FETCHING_PROFILE_INFO}_START` });

  const response = await request(userApi.getInfo, userId);

  if (!response.ok)
    return dispatch({
      type: `${FETCHING_PROFILE_INFO}_FAILURE`,
      payload: response,
    });

  dispatch({
    type: `${FETCHING_PROFILE_INFO}_SUCCESS`,
    payload: response.data,
  });
};

const follow = (user_id, data) => (dispatch) => {
  request(userApi.follow, user_id, data).then(async () => {
    const response = await request(userApi.getInfo, data.follower);

    dispatch({
      type: `${FETCHING_PROFILE_INFO}_SUCCESS`,
      payload: response.data,
    });
  });
};

const unFollow = (auth_user, follower_id, f_id) => (dispatch) => {
  request(userApi.unFollow, auth_user, f_id).then(async () => {
    const response = await request(userApi.getInfo, follower_id);

    dispatch({
      type: `${FETCHING_PROFILE_INFO}_SUCCESS`,
      payload: response.data,
    });
  });
};

const getTimeline = (userId) => async (dispatch) =>
  await createAction(
    FETCHING_USER_POSTS,
    userApi.getTimeline,
    dispatch,
    userId
  );

export default {
  getAllPosts,
  create,
  getUserPosts,
  getFollowers,
  getProfileData,
  follow,
  unFollow,
  getTimeline,
};
