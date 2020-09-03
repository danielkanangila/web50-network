import client from "./client";

const getAll = (query = null) =>
  query ? client.get(`/posts${query}`) : client.get("/posts");

const getById = (postId) => client.get(`/posts/${postId}`);

const getUserPosts = (userId, query = null) =>
  query
    ? client.get(`/users/${userId}/posts${query}`)
    : client.get(`/users/${userId}/posts`);

const create = (data) => client.post("/posts/", data);

const update = (postId, data) => client.put(`/posts/${postId}/`, data);

const del = (postId) => client.delete(`/posts/${postId}/`);

const like = (post_id) => client.post(`/posts/${post_id}/like`);

const removeLike = (post_id) => client.delete(`/posts/${post_id}/like`);

const unlike = (post_id, data) => client.post(`/posts/${post_id}/unlike`, data);

const removeUnlike = (post_id) => client.delete(`/posts/${post_id}/unlike`);

export default {
  getAll,
  create,
  getUserPosts,
  getById,
  update,
  del,
  like,
  removeLike,
  unlike,
  removeUnlike,
};
