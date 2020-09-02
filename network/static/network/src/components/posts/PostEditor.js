import React, { useRef } from "react";
import { useDispatch } from "react-redux";

import useAuth from "../../hooks/useAuth";
import Avatar from "../Avatar";
import Editor from "../Editor";
import actions from "../../store/actions";

const PostEditor = ({ onEdit, onEditSubmit, value }) => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const editorRef = useRef();

  const createPost = (data) => {
    dispatch(
      actions.create({
        owner: auth.user.id,
        content: data,
      })
    );
  };

  const handleSubmit = async (data) => {
    if (!onEdit) {
      createPost(data);
      editorRef.current.value = "";
    } else await onEditSubmit(data);
  };

  return (
    <div className="post-card home-header">
      <Avatar image_url={auth.user.avatar_url} className="avatar mr-3" />
      <div className="media-body">
        <Editor ref={editorRef} onSubmit={handleSubmit} defaultValue={value} />
      </div>
    </div>
  );
};

export default PostEditor;
