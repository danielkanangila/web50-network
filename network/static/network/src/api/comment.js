import client from "./client";

const create = (post_id, data) => client.get(`/posts/${post_id}/comments`);
const del = (post_id, comment_id) =>
  client.get(`/posts/${post_id}/comments/${comment_id}`);
