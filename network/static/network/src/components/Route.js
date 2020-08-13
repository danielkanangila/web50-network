import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";

const Route = ({ component: Component, ...restOfProps }) => {
  const [user] = useLocalStorage("user", null);
  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (user) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default Route;
