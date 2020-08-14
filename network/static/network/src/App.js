import React from "react";
import { Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import CompleteRegistration from "./components/CompleteRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import Route from "./components/Route";
import Main from "./components/Main";
import Logout from "./components/Logout";

const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Main} />
      <ProtectedRoute
        path="/complete-registration"
        component={CompleteRegistration}
      />
      <ProtectedRoute path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default App;
