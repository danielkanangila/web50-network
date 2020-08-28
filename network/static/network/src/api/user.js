import client from "./client";

const update = (formData) => {
  const data = new FormData();
  data.append("first_name", formData.first_name);
  data.append("last_name", formData.last_name);
  data.append("username", formData.username);
  data.append("bio", formData.bio);
  if (formData.avatar.file) {
    data.append("avatar", formData.avatar.file[0]);
  }

  return client.put("/auth/users", data);
};

const getInfo = (user_id) => client.get(`/auth/users/${user_id}`);

export default {
  update,
  getInfo,
};
