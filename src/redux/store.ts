import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./features/auth/authSlice";
import taskSlice from "./features/task/taskSlice";

// combine all reducers into 1
const rootReducer = combineReducers({ auth: authSlice, tasks: taskSlice });

// create the store and add the reducer functions
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
