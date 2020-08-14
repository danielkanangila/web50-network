import client, { getAuthToken } from "./client";

const authToken = getAuthToken();

const update = (data) =>
  client.put("/auth/user", data, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

const get = () =>
  client.get("/auth/user", {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

export default {
  update,
  get,
};
