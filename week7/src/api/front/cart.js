import {frontApi} from "../axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;

// API
// https://ec-course-api.hexschool.io
// [POST] /v2/api/{api_path}/cart
// [GET] /v2/api/{api_path}/cart
// [PUT] /v2/api/{api_path}/cart/{id}
// [DELETE] /v2/api/{api_path}/cart/{id}
// [DELETE] /v2/api/{api_path}/carts

export const fetchCarts = () =>
  frontApi.get(`/api/${API_PATH}/cart`);

export const addToCart = (data) =>
  frontApi.post(`/api/${API_PATH}/cart`, { data });

export const updateCartItem = (id, data) =>
  frontApi.put(`/api/${API_PATH}/cart/${id}`, { data });

export const removeCartItem = (id) =>
  frontApi.delete(`/api/${API_PATH}/cart/${id}`);

export const clearCart = () =>
  frontApi.delete(`/api/${API_PATH}/carts`);