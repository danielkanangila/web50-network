import React from "react";
import Avatar from "../Avatar";
import Loader from "../Loader";

const Header = ({
  avatar_url,
  auth_id,
  first_name,
  last_name,
  bio,
  request_id,
  loading,
}) => {
  if (loading) return <Loader show={loading} />;
  return (
    <div className="profile-header p-4">
      <div className="profile-header__top mb-2">
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
              <button className="btn btn-primary btn-rounded">Follow</button>
            )}
          </div>
        </div>
      </div>
      <div className="profile-header__bottom">
        <h5>{`${first_name} ${last_name}`}</h5>
        <p className="text-mute">Bio: {bio}</p>
      </div>
    </div>
  );
};

export default Header;
