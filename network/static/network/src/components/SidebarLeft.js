import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const SidebarLeft = () => {
  return (
    <div className="sidebar sidebar-left fixed">
      <div className="sidebar-header">
        <Logo />
      </div>
      <div className="sidebar-nav mt-3">
        <NavLink className="sidebar-nav--item" to="/">
          <span className="material-icons mr-3">home</span>
          Home
        </NavLink>
        <NavLink className="sidebar-nav--item" to="/people">
          <span className="material-icons mr-3">people</span>
          People
        </NavLink>
        <NavLink className="sidebar-nav--item" to="/profile">
          <span className="material-icons mr-3">person</span>
          Profile
        </NavLink>
        <NavLink className="sidebar-nav--item" to="/settings">
          <span className="material-icons mr-3">settings</span>
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarLeft;
