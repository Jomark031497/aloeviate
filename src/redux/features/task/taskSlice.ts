import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITask, ITaskFormValues, ITaskState } from "../../../lib/types";

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

export const updateTask = createAsyncThunk("task/update", async (payload: ITask, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/api/tasks/${payload._id}`, payload);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState: ITaskState = {
  data: [],
  error: null,
  isLoading: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get task reducers
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

    // add task reducers
    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // update task reducers
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.data.findIndex((task) => task._id === action.payload._id);
      state.data[index] = action.payload;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
