import client from "./client";

const getAll = () => client.get("/posts");

export default {
  getAll,
};
