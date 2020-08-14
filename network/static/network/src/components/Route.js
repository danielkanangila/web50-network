import React from "react";
import { Route as BrowserRoute, useHistory } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";

const Route = ({ component: Component, ...restOfProps }) => {
  const [user] = useLocalStorage("user", null);
  const history = useHistory();

  return (
    <BrowserRoute
      {...restOfProps}
      render={(props) => {
        if (user && user.token) {
          return history.goBack();
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default Route;
