import React from "react";

import { List } from "./../list";

const FriendList = ({ title, list }) => {
  return (
    <div className="pl-4 pr-4">
      <List>
        <h5>{title}</h5>
      </List>
    </div>
  );
};

export default FriendList;
