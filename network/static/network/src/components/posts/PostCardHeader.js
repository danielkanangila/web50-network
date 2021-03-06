import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import Menu, { MenuItem } from "../Menu";

const PostCardHeader = ({
  ownerId,
  displayName,
  createdAt,
  onEdit,
  onDelete,
}) => {
  const auth = useAuth();
  const history = useHistory();

  const isOwner = () => ownerId === auth?.user?.id;

  const handleClick = () => {
    // go to the user profile page only if user is authenticated
    if (auth.user) {
      return history.push(`/profile/${ownerId}`);
    }
    return;
  };
  return (
    <div className="media-body__header d-flex w-100 d-flex justify-content-between align-items-center">
      <h6 onClick={handleClick}>
        {displayName}
        <small className="text-muted text-small ml-2">
          {moment(createdAt, "YYYY-MM-DD hh:mm:ss").fromNow()}
        </small>
      </h6>
      {isOwner() && (
        <Menu>
          <MenuItem onClick={onEdit}>Edit</MenuItem>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default PostCardHeader;
