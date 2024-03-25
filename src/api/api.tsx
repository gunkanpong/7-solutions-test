import axios from "axios";
export const apiUrl =  process.env.REACT_APP_BASE_URL;
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
  }
);

export default class BaseAPI {
  static api = instance;
}

