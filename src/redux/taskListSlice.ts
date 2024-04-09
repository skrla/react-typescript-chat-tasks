import { createSlice } from "@reduxjs/toolkit";
import { TaskListType, TaskType } from "../types";

const initialState: TaskListSliceType = {
  currentTaskList: [],
};

export const defaultTaskList: TaskListType = {
  title: "Sample Task List",
  tasks: [],
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
      state.currentTaskList = action.payload;
    },
    addTaskList: (state, action) => {
      const newTaskList = action.payload;
      newTaskList.editMode = true;
      newTaskList.tasks = [];
      state.currentTaskList.unshift(newTaskList);
    },
    updateTaskListTitle: (state, action) => {
      const { id, title } = action.payload;
      state.currentTaskList = state.currentTaskList.map((e) => {
        if (e.id === id) {
          e.title = title;
          e.editMode = false;
        }
        return e;
      });
    },
    editTaskListSwitch: (state, action) => {
      const { id, value } = action.payload;
      state.currentTaskList = state.currentTaskList.map((e) => {
        if (e.id === id) {
          e.editMode = value !== undefined ? value : true;
        }
        return e;
      });
    },
    deleteTaskList: (state, action) => {
      const listId = action.payload;
      state.currentTaskList = state.currentTaskList.filter(
        (e) => e.id !== listId
      );
    },
    addTask: (state, action) => {
      const { listId, newTask } = action.payload;

      state.currentTaskList = state.currentTaskList.map((e) => {
        if (listId === e.id) {
          e.editMode = false;
          e.tasks = e.tasks?.map((t) => {
            t.editMode = false;
            t.collapsed = true;
            return t;
          });
          e.tasks?.push({ ...newTask, editMode: true, collapsed: false });
        }
        return e;
      });
    },
  },
});

export const {
  setTaskList,
  addTaskList,
  updateTaskListTitle,
  editTaskListSwitch,
  deleteTaskList,
  addTask,
} = taskListSlice.actions;
export default taskListSlice.reducer;
