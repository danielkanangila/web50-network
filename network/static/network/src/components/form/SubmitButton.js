import React from "react";

const SubmitButton = ({ title, loading }) => {
  return (
    <button className="btn btn-primary" type="submit" disabled={loading}>
      {!loading && title}
      {loading && (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      )}
    </button>
  );
};

export default SubmitButton;
