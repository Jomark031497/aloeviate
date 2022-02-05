import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IAuthFormValues, IAuthState } from "../../../lib/types";

export const register = createAsyncThunk("auth/register", async (payload: IAuthFormValues, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/auth/register", payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
  }
});

export const login = createAsyncThunk("auth/login", async (payload: IAuthFormValues, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/auth/login", payload);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.error);
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
