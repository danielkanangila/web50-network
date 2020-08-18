import React from "react";
import AppBar from "../AppBar";

const Main = () => {
  return (
    <div className="container-responsive">
      <div className="row">
        <div className="sidebar-left fixed"></div>
        <div className="center-content">
          <AppBar title="Home" subTitle="" />
          <div className="center-content--body"></div>
        </div>
        <div className="sidebar-right fixed"></div>
      </div>
    </div>
  );
};

export default Main;
