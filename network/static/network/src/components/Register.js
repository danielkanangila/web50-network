import React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { Form, FormTextField, SubmitButton, FormCheckbox } from "./form";
import useApi from "../hooks/useApi";
import authApi from "../api/auth";
import useAuth from "../hooks/useAuth";
import { handleBackendFeedback } from "../utils";
import Logo from "./Logo";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match."
  ),
  term: Yup.bool().required("You must accept term and conditions."),
});

const Register = () => {
  const registerApi = useApi(authApi.register);
  const auth = useAuth();

  const register = async (data, { setStatus }) => {
    const response = await registerApi.request(
      data.email,
      data.email,
      data.password
    );
    handleBackendFeedback(response, setStatus, (data) => {
      auth.login(response.data);
      window.location = "/complete-registration";
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <Form
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          term: false,
        }}
        onSubmit={register}
        validationSchema={validationSchema}
        className="card auth-card mb-3"
      >
        <h2 className="text-center mb-3">Register</h2>
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
        <FormTextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="********"
        />
        <FormCheckbox label="I Accept Terms & Conditions" name="term" />
        <div className="mt-3"></div>
        <SubmitButton title="next" loading={registerApi.loading} />
        <p className="mt-2 ">
          Already have an account? <Link to="/login">Log In here.</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
