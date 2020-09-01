import client from "./client";

const getAll = () => client.get("/posts");

const getById = (postId) => client.get(`/posts/${postId}`);

const getUserPosts = (userId) => client.get(`/users/${userId}/posts`);

const create = (data) => client.post("/posts/", data);

const update = (postId, data) => client.put(`/posts/${postId}/`, data);

const del = (postId) => client.delete(`/posts/${postId}/`);

export default {
  getAll,
  create,
  getUserPosts,
  getById,
  update,
  del,
};
