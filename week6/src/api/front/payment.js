import {frontApi} from "../axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;

// API
// https://ec-course-api.hexschool.io
// [POST] /v2/api/{api_path}/pay/{order_id}


export const payOrder = (id) =>
  frontApi.post(`/api/${API_PATH}/pay/${id}`);
