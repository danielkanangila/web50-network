import React from "react";
import MaterialIcon from "./MaterialIcon";

const Menu = ({ children }) => {
  return (
    <div className="dropdown">
      <div
        className="btn btn-default btn-rounded dropdown-toggle"
        type="div"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <MaterialIcon name="more_vert" />
      </div>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {children}
      </div>
    </div>
  );
};

export const MenuItem = ({ onClick, children }) => {
  return (
    <span onClick={onClick} className="dropdown-item">
      {children}
    </span>
  );
};

export default Menu;
