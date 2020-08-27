import React from "react";
import { useSelector, useDispatch } from "react-redux";

import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import postApi from "../../api/post";
import Avatar from "../Avatar";
import Editor from "../Editor";
import actions from "../../store/actions";

const PostEditor = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const auth = useAuth();

  const createPost = (data) => {
    dispatch(
      actions.create({
        owner: auth.user.id,
        content: data,
      })
    );
  };

  return (
    <div className="post-card home-header">
      <Avatar image_url={auth.user.avatar} className="avatar mr-3" />
      <div className="media-body">
        <Editor onSubmit={createPost} />
      </div>
    </div>
  );
};

export default PostEditor;
