import React from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import Avatar from "../Avatar";
import PostCardHeader from "./PostCardHeader";
import PostCardContent from "./PostCardContent";

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
  const history = useHistory();
  return (
    <li className="post-card p-3 pt-4">
      <Avatar
        image_url={owner_detail.avatar_url}
        alt={`#${owner_detail.first_name}`}
        className="avatar mr-3"
        onClick={() => history.push(`/profile/${owner_detail.id}`)}
      />
      <div className="media-body">
        <PostCardHeader
          ownerId={owner_detail.id}
          displayName={`${owner_detail.first_name} ${owner_detail.last_name}`}
          createdAt={created_at}
        />
        <PostCardContent
          content={content}
          comments={comments}
          like_count={like_count}
          unlike_count={unlike_count}
          post_id={id}
        />
      </div>
    </li>
  );
};

export default PostCard;
