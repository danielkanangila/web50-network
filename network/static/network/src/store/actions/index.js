import { createAction } from "../../utils";
import postApi from "../../api/post";

export const FETCHING_POSTS_START = "FETCHING_POSTS_START";
export const FETCHING_POSTS_SUCCESS = "FETCHING_POSTS_SUCCESS";
export const FETCHING_POSTS_FAILURE = "FETCHING_POSTS_FAILURE";
export const CREATE_POSTS_START = "CREATE_POSTS_START";
export const CREATE_POSTS_SUCCESS = "CREATE_POSTS_SUCCESS";
export const CREATE_POSTS_FAILURE = "CREATE_POSTS_FAILURE";

const getAll = () => async (dispatch) =>
  await createAction("FETCHING_POSTS", postApi.getAll, dispatch);

const create = (data) => async (dispatch) =>
  await createAction("CREATE_POSTS", postApi.create, dispatch, data);

export default {
  getAll,
  create,
};
