import client from "./client";

const get = (post_id) => client.get(`/posts/${post_id}`);
const create = (post_id, data) =>
  client.post(`/posts/${post_id}/comments`, data);
const del = (post_id, comment_id) =>
  client.delete(`/posts/${post_id}/comments/${comment_id}`);

export default {
  get,
  create,
  del,
};
