import React from "react";

import { List } from "./../list";
import FriendListItem from "./FriendListItem";
import Avatar from "../Avatar";

const FriendList = ({ title, list }) => {
  return (
    <div className="friend-list">
      <div className="pl-4 pr-4 mb-4">
        <h5>{title}</h5>
      </div>
      <div className="divider"></div>
      <List>
        {list?.map((item, idx) => (
          <FriendListItem
            key={idx}
            title={`${item.detail.first_name} ${item.detail.last_name}`}
            to={`/profile/${item.detail.id}`}
            Icon={() => (
              <Avatar
                image_url={item.detail.avatar_url}
                alt={item.detail.first_name}
                width={50}
                height={50}
                className="mr-1"
              />
            )}
          />
        ))}
      </List>
    </div>
  );
};

export default FriendList;
