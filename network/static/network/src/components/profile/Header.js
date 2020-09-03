import React from "react";
import Avatar from "../Avatar";
import Loader from "../Loader";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";

const Header = ({
  avatar_url,
  auth_id,
  first_name,
  last_name,
  bio,
  request_id,
  loading,
  followers_count,
  following_count,
  followers,
  post_count,
}) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFollow = () => {
    if (auth_id === request_id) return;
    if (!isFollowed())
      dispatch(actions.follow(auth_id, { follower: request_id }));
    else {
      const friendShip = followers.filter((item) => item.detail.id === auth_id);
      dispatch(actions.unFollow(auth_id, request_id, friendShip[0].id));
    }
  };

  const isFollowed = () => {
    if (followers) {
      const filteredFriends = followers.filter(
        (item) => item.detail.id === auth_id
      );
      if (filteredFriends.length) return true;
    }
    return false;
  };
  const getFollowBtnTitle = () => (isFollowed() ? "Unfollow" : "Follow");

  if (loading) return <Loader show={loading} />;
  return (
    <div className="profile-header">
      <div className="profile-header__top mb-2 p-4">
        <div className="d-flex w-100 justify-content-between align-items-baseline">
          <Avatar
            image_url={avatar_url}
            alt={`#${first_name}`}
            width={150}
            height={150}
          />
          <div className="d-flex">
            {auth_id === parseInt(request_id) ? (
              <button
                onClick={() => history.push(`/profile/${auth_id}/edit`)}
                className="btn btn-primary btn-rounded"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={onFollow}
                className="btn btn-primary btn-rounded"
              >
                {getFollowBtnTitle()}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="profile-header__bottom">
        <div className="pl-4 pr-4">
          <h5>{`${first_name} ${last_name}`}</h5>
          <p className="text-mute">Bio: {bio}</p>
        </div>
        {/* <div className="divider"></div> */}
        <div className="profile-header__nav d-flex w-100 ">
          <NavLink
            exact
            to={match.url}
            className="profile-header__nav_link pt-2 pb-2 pl-4 pr-4"
          >
            <span className="text-muted mr-2">{post_count}</span>
            Posts
          </NavLink>
          <NavLink
            to={`${match.url}/following`}
            className="profile-header__nav_link pt-2 pb-2 pl-4 pr-4"
          >
            <span className="text-muted mr-2">{following_count}</span>
            Following
          </NavLink>
          <NavLink
            to={`${match.url}/followers`}
            className="profile-header__nav_link pt-2 pb-2 pl-4 pr-4"
          >
            <span className="text-muted mr-2">{followers_count}</span>
            Followers
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
