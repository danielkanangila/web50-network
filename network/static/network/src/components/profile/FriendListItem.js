import React from "react";

import { LinkListItem } from "../list";
import MaterialIcon from "../MaterialIcon";

const FriendListItem = ({ to, Icon, title, description }) => {
  return (
    <LinkListItem
      to={to}
      style={{
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderRadius: 0,
      }}
    >
      <div className="d-flex w-100 justify-content-between d-flex align-items-center">
        <div className="d-flex d-flex align-items-center">
          <Icon />
          <div className="d-flex flex-column ml-2">
            <h6 className="mb-1">{title}</h6>
            <small className="text-muted">{description}</small>
          </div>
        </div>
        <MaterialIcon name="keyboard_arrow_right" />
      </div>
    </LinkListItem>
  );
};

export default FriendListItem;
