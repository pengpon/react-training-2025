import axios from "axios";
import { getCookie } from "../utils/cookie";
import Toast from "../utils/swal";

const API_BASE = import.meta.env.VITE_API_BASE;

const frontApi = axios.create({
  baseURL: API_BASE,
})

const adminApi = axios.create({
  baseURL: API_BASE,
})

adminApi.interceptors.request.use((config) => {
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
  },)

// api.interceptors.request.use(
//   (config) => {
//     // check request URL
//     if (config.url.includes("/admin") || config.url.includes("/user/check")) {
//       const token = getCookie("hexEcToken");
//       if (token) {
//         config.headers.Authorization = `${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

adminApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    const message = response?.data?.message || "Oops! Something went wrong.";

      Toast.fire({
        position: "top",
        icon: "error",
        title: message,
        color: "#fff",
        iconColor: "#fff",
        background: "#ef5350",
      });

    return Promise.reject(error);
  },
);



export  {frontApi, adminApi} ;
