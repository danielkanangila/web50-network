import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import PostList from "./posts/PostList";
import PostEditor from "./posts/PostEditor";
import actions from "../store/actions";

const Home = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllPosts());
  }, []);
  return (
    <Layout appBar={{ title: "Home" }}>
      <div className="home">
        <PostEditor />
        <hr />
        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export default Home;
