import React, { useRef } from "react";

import useAuth from "../../../hooks/useAuth";
import Avatar from "../../Avatar";
import Editor from "../../Editor";
import commentApi from "../../../api/comment";
import useApi from "../../../hooks/useApi";

const CommentEditor = ({ postId, refresh }) => {
  const auth = useAuth();
  const editorRef = useRef();
  const createCommentApi = useApi(commentApi.create);

  const handleSubmit = async (content) => {
    const response = await createCommentApi.request(postId, {
      post: postId,
      owner: auth.user.id,
      content,
    });
    if (response.status === 200) await refresh();
    editorRef.current.value = "";
  };

  return (
    <div className="post-card home-header">
      <Avatar image_url={auth.user.avatar_url} className="avatar mr-3" />
      <div className="media-body">
        <Editor ref={editorRef} onSubmit={handleSubmit} title="Comment" />
      </div>
    </div>
  );
};

export default CommentEditor;
