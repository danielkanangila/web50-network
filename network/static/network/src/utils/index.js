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

/**
 * Handle backend response
 * @param {object} response ajax response object (axios response).
 * @param {object} setStatus formik set status dispatcher to set backend error to the form if any.
 * @param {Function} successCallback function to call on request success.
 */
export const handleBackendFeedback = (response, setStatus, successCallback) => {
  switch (response.status) {
    case 200:
      return successCallback(response.data);
    case 400:
      const errors = transformBackendErrors(response.data);
      console.log(response);
      return setStatus(errors);
    case 500:
      console.log(response);
      return setStatus({ details: "An unknown error occurred." });
    default:
      console.log(response);
      setStatus({ details: "Something went wrong." });
  }
};
