import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Avatar from "../Avatar";
import PostCardHeader from "./PostCardHeader";
import PostCardContent from "./PostCardContent";
import actions from "../../store/actions";
import useAuth from "../../hooks/useAuth";

const PostCard = ({
  id,
  owner_detail,
  content,
  like_count,
  unlike_count,
  liked,
  unlike,
  medias = [],
  comments,
  created_at,
  onEdit,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const auth = useAuth();

  const deletePost = async () => {
    dispatch(actions.deletePost(id, match));
    if (match.url.includes("posts")) return history.goBack();
  };

  const handleEdit = () => {
    if (match.url.includes("posts")) return onEdit();
    return history.push(`/posts/${id}`, { edit: true });
  };

  const handleClick = () => {
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
          onEdit={handleEdit}
          onDelete={deletePost}
        />
        <PostCardContent
          content={content}
          comments={comments}
          like_count={like_count}
          unlike_count={unlike_count}
          post_id={id}
          liked={liked}
          unlike={unlike}
        />
      </div>
    </li>
  );
};

export default PostCard;
