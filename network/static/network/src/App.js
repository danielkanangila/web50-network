import React from "react";
import { Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import CompleteRegistration from "./components/CompleteRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import Route from "./components/Route";
import Logout from "./components/Logout";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import Timeline from "./components/Timeline";
import Post from "./components/posts/Post";
import Explorer from "./components/explorer/Explorer";

const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute path="/timeline" component={Timeline} />
      <ProtectedRoute path="/profile/:user_id" component={Profile} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/posts/:post_id" component={Post} />
      <ProtectedRoute
        path="/complete-registration"
        component={CompleteRegistration}
      />
      <ProtectedRoute path="/logout" component={Logout} />
      <Route path="/explorer" component={Explorer} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route>
        <h1>Not Found</h1>
      </Route>
    </Switch>
  );
};

export default App;
