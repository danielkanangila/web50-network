export { default as ReducerSwitch } from "./ReducerSwitch";

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

export const request = async (apiFunc, ...args) => {
  let response;
  try {
    response = await apiFunc(...args);
    response = {
      ...response,
      ok: true,
    };
  } catch (error) {
    console.log(error);
    response = error.response;
    response = {
      ...response,
      ok: false,
    };
  }
  return response;
};

export const createAction = async (action, apiFunc, dispatch, ...args) => {
  dispatch({ type: `${action}_START` });

  const response = await request(apiFunc, ...args);

  if (!response.ok)
    return dispatch({
      type: `${action}_FAILURE`,
      payload: response,
    });

  return dispatch({
    type: `${action}_SUCCESS`,
    payload: response.data,
  });
};
