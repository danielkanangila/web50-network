import React from "react";
import { useHistory } from "react-router-dom";
import MaterialIcon from "../MaterialIcon";
import LikeButton from "./LikeButton";
import UnLikeButton from "./UnLikeButton";
import useAuth from "../../hooks/useAuth";

const PostCardContent = ({
  content,
  comments,
  like_count,
  unlike_count,
  post_id,
  liked,
  unlike,
}) => {
  const auth = useAuth();
  const history = useHistory();

  const handleClick = () => {
    if (auth.user) {
      return history.push(`/posts/${post_id}`);
    }
    return;
  };
  return (
    <div className="media-body__content" onClick={handleClick}>
      <div className="media-content">{content}</div>
      <div className="media-details mt-2">
        <div className="comments">
          <button className="btn-icon">
            <MaterialIcon name="mode_comment" />
          </button>
          <span>{comments?.length}</span>
        </div>
        <div>
          <LikeButton liked={liked} postId={post_id} count={like_count} />
          <UnLikeButton unlike={unlike} postId={post_id} count={unlike_count} />
        </div>
      </div>
    </div>
  );
};

export default PostCardContent;
