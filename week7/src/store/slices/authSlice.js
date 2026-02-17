import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../../api/admin/auth";
import { getCookie } from "../../utils/cookie";
import { logger } from "../../utils/logger";

export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async(_, { dispatch })=> {
    dispatch(setLoading(true));

    try {
      const token = getCookie("hexEcToken");
      if (!token) {
        dispatch(setAuth(false));
        return;
      }
      const res = await checkAuth();
      dispatch(setAuth(res.data.success));
    } catch(error) {
      dispatch(setAuth(false));
      logger.error(error.message, error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isInitializing: true,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setLoading: (state, action) => {
      state.isInitializing = action.payload
    },
    logout: (state) => {
      state.isAuth = false;
      state.isInitializing = false;
    },
    loginSuccess: (state) => {
      state.isAuth = true;
      state.isInitializing = false;
    }
  },
});

export const { setAuth, setLoading, logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;