import React, { useState, useEffect } from "react";

import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";

const Comments = ({ comments, postId, refresh }) => {
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);
  return (
    <div className="comments">
      <div className="comments-header p-4">
        <h5>Comments ({commentList?.length})</h5>
        <CommentEditor refresh={refresh} postId={postId} />
      </div>
      <div className="separator"></div>
      <CommentList comments={commentList} postId={postId} refresh={refresh} />
    </div>
  );
};

export default Comments;
