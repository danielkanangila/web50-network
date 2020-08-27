import React from "react";

import Layout from "./Layout";
import PostList from "./posts/PostList";
import PostEditor from "./posts/PostEditor";

const Home = () => {
  return (
    <Layout appBar={{ title: "Home" }}>
      <div className="home">
        <PostEditor />
        <hr />
        <PostList />
      </div>
    </Layout>
  );
};

export default Home;
