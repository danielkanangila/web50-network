import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const PostCardHeader = ({ ownerId, displayName, createdAt }) => {
  const history = useHistory();
  return (
    <div className="media-body__header">
      <h6 onClick={() => history.push(`/profile/${ownerId}`)}>
        {displayName}
        <small className="text-muted text-small ml-2">
          {moment(createdAt, "YYYY-MM-DD hh:mm:ss").fromNow()}
        </small>
      </h6>
    </div>
  );
};

export default PostCardHeader;
