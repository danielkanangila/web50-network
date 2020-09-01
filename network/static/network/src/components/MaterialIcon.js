import React from "react";

const MaterialIcon = ({ name, className }) => {
  return (
    <span className={`material-icons${className ? " " + className : ""}`}>
      {name}
    </span>
  );
};

export default MaterialIcon;
