import { createSlice } from "@reduxjs/toolkit";
import { TaskListType, TaskType } from "../types";

const initialState: TaskListSliceType = {
  currentTaskList: [],
};

export const defaultTaskList: TaskListType = {
  title: "Sample Task List",
};

type TaskListSliceType = {
  currentTaskList: TaskListType[];
};

export const defaultTask: TaskType = {
  title: "I'll do this at 9:00pm",
  description: "This is what I'll need to do in order to finish this",
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.currentTaskList = action.payload
    },
    addTaskList: (state, action) => {
      const newTaskList = action.payload;
      newTaskList.editMode = true;
      newTaskList.tasks = [];
      state.currentTaskList.unshift(newTaskList);
    },
  },
});

export const { setTaskList, addTaskList } = taskListSlice.actions;
export default taskListSlice.reducer;
