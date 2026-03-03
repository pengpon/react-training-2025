import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, checkAuth, logout } from "../../api/admin/auth";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";
import { logger } from "../../utils/logger";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (data, { rejectWithValue }) => {
    try {
      const res = await signIn(data);
      setCookie("hexEcToken", res.data.token, res.data.expired);
      return res.data;
    } catch (error) {
      logger.error(error.message, error);
      const message = error.response.data.error.message || "Failed";
      return rejectWithValue(message);
    }
  },
);

export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (_, { rejectWithValue }) => {
    try {
      await logout();
      removeCookie("hexEcToken");
    } catch (error) {
      logger.error(error.message, error);
      const message = error.response.data.error.message || "Failed";
      return rejectWithValue(message);
    }
  },
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie("hexEcToken");
      if (!token) {
        return false;
      }
      const res = await checkAuth();
      return res.data.success;
    } catch (error) {
      logger.error(error.message, error);
      return rejectWithValue(false);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isInitializing: true,
  },
  // reducers: {
  // },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.isInitializing = false;
        state.isAuth = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isInitializing = false;
      })

      // Logout
      .addCase(logoutAsync.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isInitializing = false;
        state.isAuth = false;
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isInitializing = false;
      })

      // Check Auth
      .addCase(checkAuthAsync.pending, (state) => {
        state.isInitializing = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.isInitializing = false;
        state.isAuth = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.isInitializing = false;
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
