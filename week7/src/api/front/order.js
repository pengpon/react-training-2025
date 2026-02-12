import {frontApi} from "../axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;

// API
// https://ec-course-api.hexschool.io
// [POST] /v2/api/{api_path}/order
// [GET] /v2/api/{api_path}/orders
// [GET] /v2/api/{api_path}/order/{order_id}

export const createOrder = (data) =>
  frontApi.post(`/api/${API_PATH}/order`, { data });

export const fetchAllOrders = () =>
  frontApi.get(`/api/${API_PATH}/orders`);

export const fetchOrder = (id) =>
  frontApi.get(`/api/${API_PATH}/order/${id}`);
