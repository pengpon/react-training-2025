import axiosInstance from "./axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;

// API
// https://ec-course-api.hexschool.io
// [GET] /v2/api/{api_path}/admin/products/all
// [POST] /v2/api/{api_path}/admin/product
// [DELETE] /v2/api/{api_path}/admin/product/{id}
// [PUT] /v2/api/{api_path}/admin/product/{id}

export const fetchProducts = () =>
  axiosInstance.get(`${API_PATH}/admin/products/all`);

export const createProduct = (data) =>
  axiosInstance.get(`${API_PATH}/admin/product`, { data });

export const editProduct = (id, data) =>
  axiosInstance.get(`${API_PATH}/admin/product/${id}`, { data });

export const deleteProduct = (id) =>
  axiosInstance.get(`${API_PATH}/admin/product/${id}`);
