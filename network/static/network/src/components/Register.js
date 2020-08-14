import React from "react";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { Form, FormTextField, SubmitButton } from "./form";
import useApi from "../hooks/useApi";
import authApi from "../api/auth";
import useAuth from "../hooks/useAuth";
import { handleBackendFeedback } from "../utils";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

const Register = () => {
  const registerApi = useApi(authApi.register);
  const auth = useAuth();
  const history = useHistory();

  const register = async (data, { setStatus, resetForm }) => {
    const response = await registerApi.request(
      data.email,
      data.email,
      data.password
    );
    handleBackendFeedback(response, setStatus, (data) => {
      auth.login(response.data);
      history.push("/complete-registration");
    });
  };

  return (
    <Form
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={register}
      validationSchema={validationSchema}
      className="card auth-card"
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
      <SubmitButton title="next" loading={registerApi.loading} />
      <p className="mt-2">
        Already have an account? <Link to="/login">Log In here.</Link>
      </p>
    </Form>
  );
};

export default Register;
