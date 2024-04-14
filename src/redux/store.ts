import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import taskListSlice from "./taskListSlice";
import chatSlice from "./chatSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    taskList: taskListSlice,
    chat: chatSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
