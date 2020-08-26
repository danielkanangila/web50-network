import React, { useEffect, useCallback } from "react";

import Layout from "./Layout";
import Editor from "./Editor";
import useApi from "../hooks/useApi";
import postApi from "../api/post";
import PostCard from "./PostCard";

const Home = () => {
  const getPostsApi = useApi(postApi.getAll);

  const getAllPost = useCallback(async () => {
    return await getPostsApi.request();
  }, [getPostsApi]);

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <Layout appBar={{ title: "Home" }}>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-11">
          <Editor />
        </div>
        <hr />
        <div className="list-unstyled w-100">
          {getPostsApi.data?.map((post) => (
            <React.Fragment key={post.id}>
              <PostCard {...post} />
              <div className="divider"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
