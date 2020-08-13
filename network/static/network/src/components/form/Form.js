import React from "react";
import { Formik } from "formik";

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...otherProps
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, status }) => (
        <form onSubmit={handleSubmit} {...otherProps}>
          {status?.details && (
            <div className="alert alert-danger">{status}</div>
          )}
          {children}
        </form>
      )}
    </Formik>
  );
};

export default Form;
