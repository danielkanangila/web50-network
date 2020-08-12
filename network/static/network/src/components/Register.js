import React from "react";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { Form, FormTextField } from "./form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

const Register = () => {
  const history = useHistory();
  const register = (data) => {
    //console.log(data);
    history.push("/complete-registration");
  };
  return (
    <Form
      initialValues={{ email: "", password: "", confirmPassword: "" }}
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
      <button className="btn btn-primary" type="submit">
        Next
      </button>
      <p className="mt-2">
        Already have an account? <Link to="/login">Log In here.</Link>
      </p>
    </Form>
  );
};

export default Register;
