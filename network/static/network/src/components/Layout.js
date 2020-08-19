import React from "react";

import AppBar from "./AppBar";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

const Layout = ({ appBar, children }) => {
  return (
    <div>
      <div className="container-responsive">
        <div className="row">
          <SidebarLeft />
          <div className="center-content">
            <AppBar title={appBar.title} subTitle={appBar?.subTitle} />
            <div className="center-content--body">{children}</div>
          </div>
          <SidebarRight />
        </div>
      </div>
    </div>
  );
};

export default Layout;
