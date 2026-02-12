import {frontApi} from "../axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;

// API
// For User
// https://ec-course-api.hexschool.io
// [GET] /v2/api/{api_path}/products/all
// [GET] /v2/api/{api_path}/products  (query: page, category)
// [GET] /v2/api/{api_path}/product/{id}


export const fetchAllProducts = () =>
  frontApi.get(`/api/${API_PATH}/products/all`);

export const fetchProducts = (page = 1, category) =>
  frontApi.get(`/api/${API_PATH}/products`, {
    params: {
      page: page,
      category: category
    },
  });

export const fetchProduct = (id) =>
  frontApi.get(`/api/${API_PATH}/product/${id}`);
