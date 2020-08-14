import client, { getAuthToken } from "./client";

const authToken = getAuthToken();

const update = (formData) => {
  const data = new FormData();
  data.append("first_name", formData.first_name);
  data.append("last_name", formData.last_name);
  data.append("username", formData.username);
  data.append("bio", formData.bio);
  if (formData.avatar.file) {
    data.append("avatar", formData.avatar.file[0]);
  }

  return client.put("/auth/user", data, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });
};

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
