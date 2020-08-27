import client from "./client";

const getAll = () => client.get("/posts");

const create = (data) => client.post("/posts/", data);

export default {
  getAll,
  create,
};
