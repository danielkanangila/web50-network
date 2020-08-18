import React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "../AppBar";
import Logo from "./Logo";

const Main = () => {
  return (
    <div className="container-responsive">
      <div className="row">
        <div className="sidebar sidebar-left fixed">
          <div className="sidebar-header">
            <Logo />
          </div>
          <div className="sidebar-nav mt-3">
            <NavLink className="sidebar-nav--item" to="/">
              <span class="material-icons mr-2">home</span>
              Home
            </NavLink>
            <NavLink className="sidebar-nav--item" to="/friends">
              <span class="material-icons mr-2">people</span>
              Friends
            </NavLink>
            <NavLink className="sidebar-nav--item" to="/profile">
              <span class="material-icons mr-2">person</span>
              Profile
            </NavLink>
          </div>
        </div>
        <div className="center-content">
          <AppBar title="Home" subTitle="" />
          <div className="center-content--body"></div>
        </div>
        <div className="sidebar sidebar-right fixed"></div>
      </div>
    </div>
  );
};

export default Main;
