import React from "react";
import * as Yup from "yup";

import { Form, FormTextField } from "./form";
import ProfilePicSelector from "./ProfilePicSelector";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required().min(2).label("First Name"),
  last_name: Yup.string().required().min(2).label("Last Name"),
  bio: Yup.string().label("Bio"),
});

const CompleteRegistration = () => {
  const completeRegistration = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Form
        initialValues={{ first_name: "", last_name: "", bio: "" }}
        validationSchema={validationSchema}
        onSubmit={completeRegistration}
        className="card auth-card"
      >
        <h3 className="mb-4">Complete your Registration</h3>
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
        <ProfilePicSelector />

        <button className="btn btn-primary" type="submit">
          Complete Registration
        </button>
      </Form>
    </div>
  );
};

export default CompleteRegistration;
