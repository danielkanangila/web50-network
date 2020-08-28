import React from "react";

const List = ({ children, widget = "div" }) => {
  if (widget === "ul") {
    return <ul className="list-group">{children}</ul>;
  }
  return <div className="list-group">{children}</div>;
};

export default List;
