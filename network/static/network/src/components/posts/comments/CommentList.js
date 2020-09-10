import React from "react";
import CommentCard from "./CommentCard";

const CommentList = ({ comments, refresh }) => {
  return (
    <div>
      {comments?.map((comment) => (
        <React.Fragment key={comment.id}>
          <CommentCard {...comment} refresh={refresh} />
          <div className="divider"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommentList;
