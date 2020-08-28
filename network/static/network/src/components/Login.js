import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { Form, FormTextField, FormCheckbox, SubmitButton } from "./form";
import { default as authApi } from "./../api/auth";
import useAuth from "./../hooks/useAuth";
import useApi from "./../hooks/useApi";
import { handleBackendFeedback } from "../utils";
import Logo from "./Logo";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  const login = async (credentials, { setStatus }) => {
    const response = await loginApi.request(
      credentials.email,
      credentials.password
    );
    handleBackendFeedback(response, setStatus, (user) => {
      auth.login(user);
      window.location = "/";
    });
  };
  return (
    <div className="auth-wrapper">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <Form
        initialValues={{ email: "", password: "", remember_me: false }}
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
        <FormCheckbox label="Remember Me" name="remember_me" />
        <div className="mt-3"></div>
        <SubmitButton title="Login" loading={loginApi.loading} />
        <p className="mt-2">
          Don't have an account? <Link to="/register">Register here.</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
