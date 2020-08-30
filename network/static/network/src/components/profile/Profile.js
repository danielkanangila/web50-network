import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Route, useRouteMatch } from "react-router-dom";

import Layout from "../Layout";
import useAuth from "../../hooks/useAuth";
import PostList from "../posts/PostList";
import actions from "../../store/actions";
import Header from "./Header";
import FriendList from "./FriendList";

const Profile = () => {
  const auth = useAuth();
  const { loading } = useSelector((state) => state.users);
  const { posts, ...userInfo } = useSelector((state) => state.users.data) || [];
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const match = useRouteMatch();
  useEffect(() => {
    dispatch(actions.getProfileData(user_id));
  }, [user_id]);

  return (
    <Layout appBar={{ title: "Profile" }}>
      <div className="profile">
        <Header
          loading={loading}
          {...userInfo}
          auth_id={auth.user.id}
          request_id={user_id}
        />
        <div className="divider"></div>
        <div className="profile-body post-list mt-3">
          <Route
            exact
            path={match.url}
            render={() => <PostList posts={{ data: posts, loading }} />}
          />
          <Route
            path={`${match.url}/following`}
            render={() => (
              <FriendList title="Following" list={userInfo.following} />
            )}
          />
          <Route
            path={`${match.url}/followers`}
            render={() => (
              <FriendList title="Followers" list={userInfo.followers} />
            )}
          />
          <Route path={`${match.url}/edit`} component={() => <></>} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
