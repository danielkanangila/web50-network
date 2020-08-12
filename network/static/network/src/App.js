import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CompleteRegistration from "./components/CompleteRegistration";

const App = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/complete-registration" component={CompleteRegistration} />
    </Switch>
  );
};

export default App;
