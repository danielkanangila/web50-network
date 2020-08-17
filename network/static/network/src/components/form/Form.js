import React, { useRef, useEffect } from "react";
import { Formik } from "formik";

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  className,
  ...otherProps
}) => {
  const formRef = useRef(null);

  const hasNonFieldStatus = (status) => {
    return (status && status.non_field_errors) || (status && status.details);
  };

  const parseStatus = (status) => {
    const error = status.non_field_errors || status.details;
    return error;
  };

  const appendStatusAsHTML = (status) => {
    if (document.querySelector("#feedbackStatus")) {
      document.querySelector("#feedbackStatus").remove();
    }
    const error = parseStatus(status);
    const alert = document.createElement("div");
    alert.classList.add("alert", "alert-danger");
    alert.setAttribute("id", "feedbackStatus");
    alert.innerText = error;
    formRef.current.insertBefore(
      alert,
      formRef.current.firstElementChild.nextSibling
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, status }) => (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`${className} shadow-sm rounded`}
          {...otherProps}
        >
          {hasNonFieldStatus(status) && (
            <Error cb={appendStatusAsHTML} status={status} />
          )}
          {children}
        </form>
      )}
    </Formik>
  );
};

const Error = ({ cb, status }) => {
  useEffect(() => {
    cb(status);
  }, [cb, status]);
  return <></>;
};

export default Form;
