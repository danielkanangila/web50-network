import React from "react";

import Layout from "./Layout";
import Editor from "./Editor";
import useApi from "../hooks/useApi";
import postApi from "../api/post";
import Avatar from "./Avatar";
import useAuth from "./../hooks/useAuth";
import PostList from "./posts/PostList";

const Home = () => {
  const savePost = useApi(postApi.createPost);
  const auth = useAuth();

  const createPost = (data) => {
    console.log(data);
  };

  return (
    <Layout appBar={{ title: "Home" }}>
      <div className="home">
        <div className="post-card home-header">
          <Avatar image_url={auth.user.avatar} className="avatar mr-3" />
          <div className="media-body">
            <Editor onSubmit={createPost} />
          </div>
        </div>
        <hr />
        <PostList />
      </div>
    </Layout>
  );
};

export default Home;
