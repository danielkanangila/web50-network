import React from "react";

import Loader from "../Loader";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <React.Fragment>
      <Loader show={posts?.loading} />
      {!posts?.loading && (
        <div className="list-unstyled w-100">
          {!posts?.data?.count && (
            <h5 className="text-muted text-center mt-5">No posts found.</h5>
          )}
          {posts?.data?.results?.map((post) => (
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
