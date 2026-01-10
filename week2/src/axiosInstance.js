import axios from "axios";
import { getCookie } from "./utility";

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE
})

// Request
api.interceptors.request.use(
  (config) => {
    // check request URL
    if (config.url.includes("/admin") || config.url.includes("/user/check")) {
      const token = getCookie("hexEcToken");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
