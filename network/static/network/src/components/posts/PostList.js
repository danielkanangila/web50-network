import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../Loader";
import PostCard from "./PostCard";
import actions from "../../store/actions";

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAll());
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
