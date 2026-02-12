import {adminApi} from "../axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;

// API
// https://ec-course-api.hexschool.io
// [GET] /v2/api/{api_path}/admin/products/all
// [GET] /v2/api/{api_path}/admin/products  (query: page, category)
// [POST] /v2/api/{api_path}/admin/product
// [DELETE] /v2/api/{api_path}/admin/product/{id}
// [PUT] /v2/api/{api_path}/admin/product/{id}

export const fetchAllProducts = () =>
  adminApi.get(`/api/${API_PATH}/admin/products/all`);

export const fetchProducts = (page = 1, category) =>
  adminApi.get(`/api/${API_PATH}/admin/products`, {
    params: {
      page: page,
      category: category
    },
  });

export const createProduct = (data) =>
  adminApi.post(`/api/${API_PATH}/admin/product`, { data });

export const editProduct = (id, data) =>
  adminApi.put(`/api/${API_PATH}/admin/product/${id}`, { data });

export const deleteProduct = (id) =>
  adminApi.delete(`/api/${API_PATH}/admin/product/${id}`);
