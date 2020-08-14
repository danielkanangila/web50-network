import React from "react";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { Form, FormTextField } from "./form";
import FormImagePicker from "./form/FormImagePicker";
import useApi from "../hooks/useApi";
import { default as userApi } from "./../api/user";
import useAuth from "../hooks/useAuth";
import { handleBackendFeedback } from "../utils";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().min(2).label("First Name"),
  last_name: Yup.string().required().min(2).label("Last Name"),
  bio: Yup.string().label("Bio"),
  avatar: Yup.mixed().test(
    "mineType",
    "Invalid file type. Allowed mine types [image/jpeg, image/png]",
    (value) => {
      const validType = ["image/jpeg", "image/png"];
      if (!value) return true;
      return validType.includes(value.file[0].type);
    }
  ),
});

const CompleteRegistration = ({ redirectTo = "/" }) => {
  const auth = useAuth();
  const updateApi = useApi(userApi.update);
  const history = useHistory();
  const formTitle = auth.user.first_name
    ? "Update Profile"
    : "Complete your Registration";
  const btnTitle = auth.user.first_name ? "Update" : "Complete Registration";

  const completeRegistration = async (data, { setStatus }) => {
    const response = await updateApi.request(data);
    handleBackendFeedback(response, setStatus, () => history.push(redirectTo));
  };
  return (
    <div>
      <Form
        initialValues={{
          first_name: auth.user.first_name || "",
          last_name: auth.user.first_name || "",
          bio: auth.user.bio || "",
          avatar: null,
        }}
        validationSchema={validationSchema}
        onSubmit={completeRegistration}
        className="card auth-card cr"
      >
        <h3 className="mb-4">{formTitle}</h3>
        <FormTextField
          type="text"
          name="first_name"
          label="First Name"
          placeholder="Joe"
        />
        <FormTextField
          type="text"
          name="last_name"
          label="Last Name"
          placeholder="Don"
        />
        <FormTextField
          type="text"
          name="bio"
          label="Bio"
          placeholder="Your bio here."
          widget="textarea"
          style={{ height: 100 }}
        />
        <FormImagePicker
          label="Select Profile Picture"
          borderColor="#ccc"
          name="avatar"
          width="160px"
          height="160px"
        />
        <div className="mt-3"></div>

        <button className="btn btn-primary" type="submit">
          {btnTitle}
        </button>
      </Form>
    </div>
  );
};

export default CompleteRegistration;
