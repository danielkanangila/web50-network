import React from "react";
import { NavLink, Link } from "react-router-dom";

import Logo from "../Logo";
import MaterialIcon from "../MaterialIcon";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg border-bottom sticky-top bg-white">
      <div className="container ">
        <Link to="/explorer" className="navbar-brand">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MaterialIcon name="menu" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div></div>
          <ul className="navbar-nav ml-auto">
            <NavLink to="/register" className="nav-link font-weight-bold">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="nav-link font-weight-bold">
              Login
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
