import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Route, useRouteMatch } from "react-router-dom";

import Layout from "../Layout";
import useAuth from "../../hooks/useAuth";
import PostList from "../posts/PostList";
import actions from "../../store/actions";
import Header from "./Header";
import FriendList from "./FriendList";
import postApi from "../../api/post";
import useApi from "../../hooks/useApi";
import EditProfile from "./EditProfile";
import CompleteRegistration from "../CompleteRegistration";

const Profile = () => {
  const auth = useAuth();
  const { loading } = useSelector((state) => state.users);
  const userInfo = useSelector((state) => state.users.data) || [];
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const match = useRouteMatch();
  const posts = useApi(postApi.getUserPosts);

  const getUserPosts = async () => await posts.request(user_id);

  useEffect(() => {
    getUserPosts();
    dispatch(actions.getProfileData(user_id));
    document.addEventListener("post_deleted", () => {
      getUserPosts();
    });
    document.addEventListener("profile_updated", () =>
      dispatch(actions.getProfileData(user_id))
    );
    return () => [];
  }, [user_id]);

  return (
    <Layout appBar={{ title: "Profile" }}>
      <div className="profile">
        <Header
          loading={loading}
          {...userInfo}
          auth_id={auth.user.id}
          request_id={user_id}
          post_count={posts?.data?.count}
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
          <Route
            path={`${match.url}/edit`}
            render={() => (
              <CompleteRegistration
                isEdit={true}
                redirectTo={`/profile/${auth.user.id}`}
              />
            )}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
