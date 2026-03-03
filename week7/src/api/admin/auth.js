import {adminApi} from "../axiosInstance";

// API
// https://ec-course-api.hexschool.io
// [POST] /v2/admin/signin 登入
// [POST] /v2/api/user/check 驗證
// [POST] /v2/logout 登出

export const signIn = (data) => adminApi.post("/admin/signin", data);
export const checkAuth = () => adminApi.post("/api/user/check");
export const logout = () => adminApi.post("/logout");
