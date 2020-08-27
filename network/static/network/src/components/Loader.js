import React from "react";

const Loader = ({ show }) => {
  if (show) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Loader;
