import React from "react";
import { useHistory } from "react-router-dom";
import MaterialIcon from "../MaterialIcon";

const PostCardContent = ({
  content,
  comments,
  like_count,
  unlike_count,
  post_id,
}) => {
  const history = useHistory();
  return (
    <div
      className="media-body__content"
      onClick={() => history.push(`/posts/${post_id}`)}
    >
      <div className="media-content">{content}</div>
      <div className="media-details mt-2">
        <div className="comments">
          <button className="btn-icon">
            <MaterialIcon name="mode_comment" />
          </button>
          <span>{comments?.length}</span>
        </div>
        <div className="likes">
          <button className="btn-icon">
            <MaterialIcon name="thumb_up_alt" />
          </button>
          <span>{like_count}</span>
        </div>
        <div className="unlike">
          <button className="btn-icon">
            <MaterialIcon name="thumb_down_alt" />
          </button>
          <span>{unlike_count}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCardContent;
