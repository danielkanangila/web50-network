import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import Logo from "../Logo";
import MaterialIcon from "../MaterialIcon";
import useApi from "../../hooks/useApi";
import postApi from "./../../api/post";
import Navbar from "./Navbar";
import PostList from "../posts/PostList";
const Explorer = () => {
  const posts = useApi(postApi.explorer);

  const getPosts = async () => await posts.request();

  useEffect(() => {
    getPosts();
    return () => [];
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
    alert("Please login.");
  };

  return (
    <div className="explorer">
      <Navbar />
      <div className="container explorer__post_list">
        <div onClick={handleClick} className="pl-5 pr-5">
          <h2 className="mb-4 mt-5 text-center w-100">
            Explore trending post on Network
          </h2>
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
