import React, { useState, useEffect } from "react";

import MaterialIcon from "../MaterialIcon";
import postApi from "../../api/post";
import useApi from "../../hooks/useApi";

const LikeButton = ({ postId, count, liked }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const likeApi = useApi(postApi.like);
  const deleteLikeApi = useApi(postApi.removeLike);

  useEffect(() => {
    setLikeCount(count);
    setIsLiked(liked);
  }, [count, liked]);

  const onClick = async (e) => {
    e.stopPropagation();
    let response;
    if (!isLiked) response = await likeApi.request(postId);
    else response = await deleteLikeApi.request(postId);

    if (response.status === 200) {
      setLikeCount(response.data.count);
      setIsLiked(!isLiked);
    }
  };

  return (
    <div className="likes d-flex align-items-center mr-3">
      <button onClick={onClick} className="btn-icon">
        <MaterialIcon
          name="thumb_up_alt"
          className={isLiked ? "text-primary" : ""}
        />
      </button>
      <span>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
