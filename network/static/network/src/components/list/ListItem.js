import React from "react";
import { Link } from "react-router-dom";

export const ListItem = ({ onClick, children, style }) => {
  return (
    <li
      onClick={onClick}
      className="list-group-item list-group-item-action flex-column align-items-start"
      style={style}
    >
      {children}
    </li>
  );
};

export const LinkListItem = ({ to, children, style }) => {
  return (
    <Link
      to={to}
      className="list-group-item list-group-item-action flex-column align-items-start"
      style={style}
    >
      {children}
    </Link>
  );
};
