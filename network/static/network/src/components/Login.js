import React from "react";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { Form, FormTextField } from "./form";
import { default as authApi } from "./../api/auth";
import useAuth from "./../hooks/useAuth";
import useApi from "./../hooks/useApi";
import { handleBackendFeedback } from "../utils";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const history = useHistory();

  const login = async (credentials, { setStatus }) => {
    const response = await loginApi.request(
      credentials.email,
      credentials.password
    );
    handleBackendFeedback(response, setStatus, (user) => {
      auth.login(user);
      history.push("/");
    });
  };
  return (
    <Form
      initialValues={{ email: "", password: "" }}
      onSubmit={login}
      validationSchema={validationSchema}
      className="card auth-card"
    >
      <h2 className="text-center mb-3">Login</h2>
      <FormTextField
        type="text"
        name="email"
        label="Email"
        placeholder="example@gmail.com"
      />
      <FormTextField
        type="password"
        name="password"
        label="Password"
        placeholder="********"
      />
      <button className="btn btn-primary" type="submit">
        Login
      </button>
      <p className="mt-2">
        Don't have an account? <Link to="/register">Register here.</Link>
      </p>
    </Form>
  );
};

export default Login;
