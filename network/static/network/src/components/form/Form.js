import React from "react";
import { Formik } from "formik";

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...otherProps
}) => {
  const parseStatus = (status) => {
    if (status) {
      if (status.non_field_errors || status.details) {
        const error = status.non_field_errors || status.details;
        return error;
      }
    }
    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, status }) => (
        <form onSubmit={handleSubmit} {...otherProps}>
          {parseStatus(status) && (
            <div className="alert alert-danger">{parseStatus(status)}</div>
          )}
          {children}
        </form>
      )}
    </Formik>
  );
};

export default Form;
