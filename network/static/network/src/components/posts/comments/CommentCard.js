import React from "react";
import { useHistory } from "react-router-dom";

import Avatar from "../../Avatar";
import PostCardHeader from "../PostCardHeader";
import useAuth from "../../../hooks/useAuth";
import useApi from "../../../hooks/useApi";
import commentApi from "../../../api/comment";

const CommentCard = ({
  id: commentId,
  post: postId,
  owner_detail,
  content,
  created_at,
  refresh, // fetch post and comments
}) => {
  const history = useHistory();
  const auth = useAuth();
  const deleteCommentApi = useApi(commentApi.del);

  const deleteComment = async () => {
    const response = await deleteCommentApi.request(postId, commentId);
    if (response.status === 204) await refresh();
  };

  const handleClick = () => {
    // go to the user profile page only if user is authenticated
    if (auth.user) {
      return history.push(`/profile/${owner_detail?.id}`);
    }
    return;
  };

  return (
    <li className="post-card p-3 pt-4">
      <Avatar
        image_url={owner_detail?.avatar_url}
        alt={`#${owner_detail?.first_name}`}
        className="avatar mr-3"
        onClick={handleClick}
      />
      <div className="media-body">
        <PostCardHeader
          ownerId={owner_detail?.id}
          displayName={`${owner_detail?.first_name} ${owner_detail?.last_name}`}
          createdAt={created_at}
          onEdit={() => {}}
          onDelete={deleteComment}
        />
        <div className="media-body__content">
          <div className="media-content">{content}</div>
        </div>
      </div>
    </li>
  );
};

export default CommentCard;
