import React from "react";
import Avatar from "../Avatar";
import Loader from "../Loader";
import { NavLink, useRouteMatch } from "react-router-dom";

const Header = ({
  avatar_url,
  auth_id,
  first_name,
  last_name,
  bio,
  request_id,
  loading,
  friends,
}) => {
  const match = useRouteMatch();
  const isFollowed = () => {
    if (friends && friends.following) {
      const filteredFriends = friends?.following.filter(
        (item) => item.detail.id === auth_id
      );
      if (filteredFriends.length) return true;
    }
    return false;
  };
  isFollowed();
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
              <button className="btn btn-primary btn-rounded">Edit</button>
            ) : (
              <button className="btn btn-primary btn-rounded">
                {isFollowed() ? "Unfollow" : "Follow"}
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
            Posts
          </NavLink>
          <NavLink
            to={`${match.url}/following`}
            className="profile-header__nav_link pt-2 pb-2 pl-4 pr-4"
          >
            <span className="text-muted mr-2">{friends.following_count}</span>
            Following
          </NavLink>
          <NavLink
            to={`${match.url}/followers`}
            className="profile-header__nav_link pt-2 pb-2 pl-4 pr-4"
          >
            <span className="text-muted mr-2">{friends.followers_count}</span>
            Followers
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
