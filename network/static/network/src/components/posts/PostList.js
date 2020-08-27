import React, { useCallback, useEffect } from "react";

import useApi from "../../hooks/useApi";
import postApi from "../../api/post";
import Loader from "../Loader";
import PostCard from "./PostCard";

const PostList = () => {
  const posts = useApi(postApi.getAll);

  const getAllPost = useCallback(async () => {
    return await posts.request();
  }, [posts]);

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <React.Fragment>
      <Loader show={posts.loading} />
      {!posts.loading && (
        <div className="list-unstyled w-100">
          {posts.data?.map((post) => (
            <React.Fragment key={post.id}>
              <PostCard {...post} />
              <div className="divider"></div>
            </React.Fragment>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default PostList;
