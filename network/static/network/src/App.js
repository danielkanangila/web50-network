import React from "react";
import { Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import CompleteRegistration from "./components/CompleteRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import Route from "./components/Route";
import Logout from "./components/Logout";
import Home from "./components/Home";
import People from "./components/People";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/people" component={People} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute
        path="/complete-registration"
        component={CompleteRegistration}
      />
      <ProtectedRoute path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route>
        <h1>Not Found</h1>
      </Route>
    </Switch>
  );
};

export default App;
