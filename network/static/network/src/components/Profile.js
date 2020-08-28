import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import useAuth from "./../hooks/useAuth";
import PostList from "./posts/PostList";
import actions from "../store/actions";

const Profile = () => {
  const auth = useAuth();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUserPosts(auth.user.id));
  }, []);

  return (
    <Layout appBar={{ title: "Profile" }}>
      <div className="profile">
        <div className="profile-header">
          <h4>{`${auth.user.first_name} ${auth.user.last_name}`}</h4>
        </div>
        <div className="profile-body post-list">
          <PostList posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
