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

const getInfo = (user_id) => client.get(`/users/${user_id}/profile`);

const getFollowers = (user_id) => client.get(`/users/${user_id}/followers`);

const follow = (user_id, data) =>
  client.post(`/users/${user_id}/followers`, data);

const unFollow = (user_id, follower_id) =>
  client.delete(`/users/${user_id}/followers/${follower_id}`);

export default {
  update,
  getInfo,
  getFollowers,
  follow,
  unFollow,
};
