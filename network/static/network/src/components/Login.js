import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { Form, FormTextField } from "./form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const Login = () => {
  const login = (credentials) => {
    console.log(credentials);
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
