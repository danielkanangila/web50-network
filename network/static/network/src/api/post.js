import client from "./client";

const getAll = () => client.get("/posts");

const getUserPosts = (userId) => client.get(`/users/${userId}/posts`);

const create = (data) => client.post("/posts/", data);

export default {
  getAll,
  create,
  getUserPosts,
};
