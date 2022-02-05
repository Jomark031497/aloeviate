import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITaskState } from "../../../lib/types";

export const getTasks = createAsyncThunk("task/get", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/tasks/");
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
const initialState: ITaskState = {
  data: null,
  error: null,
  isLoading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
