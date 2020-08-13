export const transformBackendErrors = (errors) => {
  const t_errors = {};
  Object.keys(errors).forEach((key) => {
    if (key === "username") {
      t_errors["email"] = errors[key].join("<br />");
    } else {
      t_errors[key] = errors[key].join("<br />");
    }
  });

  return t_errors;
};
