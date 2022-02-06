import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAuthFormValues, IAuthState } from "../../../lib/types";

export const register = createAsyncThunk("auth/register", async (payload: IAuthFormValues, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/auth/register", payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk("auth/login", async (payload: IAuthFormValues, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/auth/login", payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const initialState: IAuthState = {
  data: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.data = null;
    });
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
