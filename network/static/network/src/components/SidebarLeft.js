import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import MaterialIcon from "./MaterialIcon";

const SidebarLeft = () => {
  const auth = useAuth();
  return (
    <div className="sidebar sidebar-left sticky-top">
      <div className="sidebar-header">
        <Logo />
      </div>
      <div className="sidebar-nav mt-3">
        <NavLink exact className="sidebar-nav--item" to="/">
          <MaterialIcon name="home" className="mr-3" />
          Home
        </NavLink>
        <NavLink className="sidebar-nav--item" to="/timeline">
          <MaterialIcon name="timeline" className="mr-3" />
          Timeline
        </NavLink>
        <NavLink className="sidebar-nav--item" to={`/profile/${auth.user.id}`}>
          <MaterialIcon name="person" className="mr-3" />
          Profile
        </NavLink>
        <NavLink className="sidebar-nav--item" to="/settings">
          <MaterialIcon name="settings" className="mr-3" />
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarLeft;
