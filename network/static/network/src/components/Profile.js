import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "./Layout";
import useAuth from "./../hooks/useAuth";
import PostList from "./posts/PostList";
import actions from "../store/actions";
import Avatar from "./Avatar";

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
        <div className="profile-header p-4">
          <div className="profile-header__top mb-2">
            <div className="d-flex w-100 justify-content-between align-items-baseline">
              <Avatar
                image_url={auth.user.avatar_url}
                alt={`#${auth.user.first_name}`}
                width={150}
                height={150}
              />
              <div className="d-flex">
                <button className="btn btn-primary btn-rounded">Edit</button>
                <button className="btn btn-primary btn-rounded">Follow</button>
              </div>
            </div>
          </div>
          <div className="profile-header__bottom">
            <h5>{`${auth.user.first_name} ${auth.user.last_name}`}</h5>
            <p className="text-mute">Bio: {auth.user.bio}</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="profile-body post-list mt-3">
          <PostList posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
