import React from "react";
import { useFormikContext } from "formik";

const FormTextField = ({
  label,
  name,
  type = "text",
  widget,
  ...otherProps
}) => {
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
  } = useFormikContext();

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Widget
        type={type}
        name={name}
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.value)}
        value={values[name]}
        className={`form-control ${
          errors[name] && touched[name] ? "is-invalid" : ""
        }`}
        widget_type={widget}
        {...otherProps}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
};

const Widget = ({ widget_type, ...props }) => {
  if (widget_type === "textarea") return <textarea {...props} />;
  return <input {...props} />;
};

export default FormTextField;
