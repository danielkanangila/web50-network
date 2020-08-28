import React from "react";
import moment from "moment";

import Avatar from "../Avatar";

const PostCard = ({
  id,
  owner_detail,
  content,
  like_count,
  unlike_count,
  medias = [],
  comments,
  created_at,
}) => {
  return (
    <li className="post-card p-3 pt-4">
      <Avatar
        image_url={owner_detail.avatar_url}
        alt={`#${owner_detail.first_name}`}
        className="avatar mr-3"
      />
      <div className="media-body">
        <h6>
          {owner_detail.first_name} {owner_detail.last_name}
          <small className="text-muted text-small ml-2">
            {moment(created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}
          </small>
        </h6>
        <div className="media-content">{content}</div>
        <div className="media-details mt-2">
          <div className="comments">
            <button className="btn-icon">
              <span className="material-icons">mode_comment</span>
            </button>
            <span>{comments?.length}</span>
          </div>
          <div className="likes">
            <button className="btn-icon">
              <span className="material-icons">thumb_up_alt</span>
            </button>
            <span>{like_count}</span>
          </div>
          <div className="unlike">
            <button className="btn-icon">
              <span className="material-icons">thumb_down_alt</span>
            </button>
            <span>{unlike_count}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
