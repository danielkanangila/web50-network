import client from "./client";

const login = (username, password) =>
  client.post("/auth/login", { username, password });

const register = (username, email, password) =>
  client.post("/auth/register", { username, email, password });

export default {
  login,
  register,
};
