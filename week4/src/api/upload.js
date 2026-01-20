import axiosInstance from "./axiosInstance";

const API_PATH = import.meta.env.VITE_API_PATH;
// API
// https://ec-course-api.hexschool.io
// [POST] /v2/api/{api_path}/admin/upload 上傳圖片
// * 限使用 jpg、jpeg 與 png 格式，檔案大小限制為 3MB 以下

export const uploadImage = (data) => axiosInstance.post(`${API_PATH}/admin/upload`, data);