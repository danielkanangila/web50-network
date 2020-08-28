import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Route, useRouteMatch } from "react-router-dom";

import Layout from "../Layout";
import useAuth from "../../hooks/useAuth";
import PostList from "../posts/PostList";
import actions from "../../store/actions";
import useApi from "../../hooks/useApi";
import userApi from "../../api/user";
import Header from "./Header";
import FriendList from "./FriendList";

const Profile = () => {
  const auth = useAuth();
  const profileApi = useApi(userApi.getInfo);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const match = useRouteMatch();

  const getProfileInfo = async () => {
    await profileApi.request(user_id);
  };

  useEffect(() => {
    getProfileInfo();
    dispatch(actions.getUserPosts(user_id));
  }, [user_id]);

  return (
    <Layout appBar={{ title: "Profile" }}>
      <div className="profile">
        <Header
          loading={profileApi.loading}
          {...profileApi.data}
          auth_id={auth.user.id}
          request_id={user_id}
        />
        <div className="divider"></div>
        <div className="profile-body post-list mt-3">
          <Route
            exact
            path={match.url}
            render={() => <PostList posts={posts} />}
          />
          <Route
            path={`${match.url}/following`}
            render={() => <FriendList title="Following" />}
          />
          <Route
            path={`${match.url}/followers`}
            render={() => <FriendList title="Followers" />}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
