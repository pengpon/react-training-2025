import axiosInstance from "./axiosInstance";

// API
// https://ec-course-api.hexschool.io
// [POST] /v2/admin/signin 登入
// [POST] /v2/api/user/check 驗證

export const signIn = (data) => axiosInstance.post("/admin/signin", data);
export const checkAuth = () => axiosInstance.post("/api/user/check");
