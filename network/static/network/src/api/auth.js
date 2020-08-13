import client from "./client";

const login = (email, password) =>
  client.post("/auth/login", { email, password });

const register = (username, email, password) =>
  client.post("/auth/register", { username, email, password });

export default {
  login,
  register,
};
