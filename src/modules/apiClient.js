import axios from "axios";
import config from "./config";

const apiClient = axios.create({
  timeout: 100000,
  withCredentials: true,
  baseURL: config.apiUrl
});

function post(url, data, type) {
  let config = {};

  switch (type) {
    case "FORM":
      config.headers = {
        "Content-Type": "multipart/form-data"
      };
      break;
    case "JSON":
      config.headers = {
        "Content-Type": "application/json;charset=UTF-8"
      };
      break;
  }

  return apiClient.post(url, data, config);
}

export default post;
