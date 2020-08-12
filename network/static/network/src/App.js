import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CompleteRegistration from "./components/CompleteRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";

const App = () => {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Main} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/complete-registration" component={CompleteRegistration} />
    </Switch>
  );
};

export default App;
