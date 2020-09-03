import React, { useState, useEffect } from "react";
import MaterialIcon from "../MaterialIcon";
import postApi from "../../api/post";
import useApi from "../../hooks/useApi";

const UnLikeButton = ({ postId, count, unlike }) => {
  const [unlikeCount, setUnlikeCount] = useState(0);
  const [isUnlike, setIsUnlike] = useState(0);
  const unlikeApi = useApi(postApi.unlike);
  const deleteUnlikeApi = useApi(postApi.removeUnlike);

  useEffect(() => {
    setUnlikeCount(count);
    setIsUnlike(isUnlike);
  }, [count, unlike]);

  const onClick = async (e) => {
    e.stopPropagation();
    let response;
    if (!isUnlike) response = await unlikeApi.request(postId);
    else response = await deleteUnlikeApi.request(postId);

    if (response.status === 200) {
      setUnlikeCount(response.data.count);
      setIsUnlike(!isUnlike);
    }
  };

  return (
    <div className="unlike">
      <button onClick={onClick} className="btn-icon">
        <MaterialIcon
          name="thumb_down_alt"
          className={isUnlike ? "text-primary" : ""}
        />
      </button>
      <span>{unlikeCount}</span>
    </div>
  );
};

export default UnLikeButton;
