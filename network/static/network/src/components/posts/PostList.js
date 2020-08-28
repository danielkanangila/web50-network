import React from "react";

import Loader from "../Loader";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <React.Fragment>
      <Loader show={posts?.loading} />
      {!posts?.loading && (
        <div className="list-unstyled w-100">
          {posts?.data?.map((post) => (
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