import React, { useState, useEffect } from "react";

import Loader from "../Loader";
import PostCard from "./PostCard";
import useApi from "../../hooks/useApi";
import postApi from "../../api/post";
import { useRouteMatch } from "react-router-dom";

const PostList = ({ posts }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const getPostsApi = useApi(postApi.getAll);
  const getUserPostsApi = useApi(postApi.getUserPosts);
  const match = useRouteMatch();

  useEffect(() => {
    setData(posts.data);
  }, [posts]);

  const loadMore = async () => {
    setLoading(true);
    const nextUrl = new URL(data.next);
    let response = {};
    if (match.url.includes("profile")) {
      response = await getUserPostsApi.request(
        match.url.split("/").pop(),
        nextUrl.search
      );
    } else {
      response = await getPostsApi.request(nextUrl.search);
    }
    setData(buildState(response.data));
    setLoading(false);
  };

  const buildState = (newState) => {
    const oldPosts = data.results;
    return {
      ...newState,
      results: [...oldPosts, ...newState.results],
    };
  };

  return (
    <React.Fragment>
      <Loader show={posts?.loading} />
      {!posts?.loading && (
        <div className="list-unstyled w-100">
          {!posts?.data?.count && (
            <h5 className="text-muted text-center mt-5">No posts found.</h5>
          )}
          {data?.results?.map((post) => (
            <React.Fragment key={post.id}>
              <PostCard {...post} />
              <div className="divider"></div>
            </React.Fragment>
          ))}
          {data?.next && (
            <div className="d-flex w-100 justify-content-center p-3">
              <button
                onClick={loadMore}
                className="btn btn-default button-small btn-rounded border btn-hover"
              >
                {!loading && "More..."}
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default PostList;
