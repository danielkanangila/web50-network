import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import useAuth from "../hooks/useAuth";
import PostList from "./posts/PostList";
import actions from "../store/actions";

const Timeline = () => {
  const auth = useAuth();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTimeline(auth.user.id));
  }, []);
  return (
    <Layout appBar={{ title: "Timeline" }}>
      <div className="timeline">
        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export default Timeline;
