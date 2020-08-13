import React from "react";
import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Logout = () => {
  const auth = useAuth();
  auth.logout();
  return <Redirect to="/login" />;
};

export default Logout;
