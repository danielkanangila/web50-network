import client from "./client";

const getAll = () => client.get("/posts");

const createPost = (data) => client.post("/posts", data);

export default {
  getAll,
  createPost,
};
