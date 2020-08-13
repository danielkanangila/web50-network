import axios from "axios";
import settings from "../config/settings";

export const getAuthToken = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr).token : "";
};

const apiClient = axios.create({
  baseURL: settings.apiURL,
});

export default apiClient;
