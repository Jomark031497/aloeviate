import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITaskFormValues, ITaskState } from "../../../lib/types";

export const getTasks = createAsyncThunk("task/get", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/api/tasks/");
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addTask = createAsyncThunk("task/add", async (payload: ITaskFormValues, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/api/tasks/", payload);
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

    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data?.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
