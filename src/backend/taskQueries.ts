import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { AppDispatch } from "../redux/store";
import {
  addTask,
  addTaskList,
  defaultTask,
  defaultTaskList,
  deleteTask,
  deleteTaskList,
  saveTask,
  setTaskList,
  setTasks,
  updateTaskListTitle,
} from "../redux/taskListSlice";
import { SetLoadingType, TaskListType, TaskType } from "../types";
import { db } from "./firebaseConfig";
import { getStorageUser } from "./userQueries";
import { toastErr } from "../utils/toast";

const tasksColl = "tasks";
const taskListColl = "taskList";

export const BE_getTaskList = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const taskList = await getAllTaskList();

  dispatch(setTaskList(taskList));

  setLoading(false);
};

export const getAllTaskList = async () => {
  const q = query(
    collection(db, taskListColl),
    where("userId", "==", getStorageUser().id)
  );
  const taskListSnapshot = await getDocs(q);
  const taskList: TaskListType[] = [];

  taskListSnapshot.forEach((doc) => {
    const { title } = doc.data();
    taskList.push({
      id: doc.id,
      title,
      editMode: false,
      tasks: [],
    });
  });

  return taskList;
};

export const BE_getTasks = async (
  listId: string,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const tasksRef = collection(db, taskListColl, listId, tasksColl);
  const tasksSnapshot = await getDocs(tasksRef);
  const tasks: TaskType[] = [];

  if (!tasksSnapshot.empty) {
    tasksSnapshot.forEach((task) => {
      const { title, description } = task.data();
      tasks.push({
        id: task.id,
        title,
        description,
        editMode: false,
        collapsed: true,
      });
    });
  }

  dispatch(setTasks({ listId, tasks }));
  setLoading(false);
};

export const BE_addTaskList = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const { title } = defaultTaskList;
  const list = await addDoc(collection(db, taskListColl), {
    title,
    userId: getStorageUser().id,
  });

  if (list) {
    const newlyAddedDoc: TaskListType = {
      id: list.id,
      title: title,
    };

    dispatch(addTaskList(newlyAddedDoc));
    setLoading(false);
  } else {
    toastErr("BE_addTaskList: No such doc");
    setLoading(false);
  }
};

export const BE_addTask = async (
  listId: string,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const task = await addDoc(collection(db, taskListColl, listId, tasksColl), {
    ...defaultTask,
  });

  const { title, description } = defaultTask;
  const newTask: TaskType = {
    id: task.id,
    title,
    description,
  };

  dispatch(addTask({ listId, newTask }));

  setLoading(false);
};

export const BE_saveTaskList = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType,
  listId: string,
  title: string
) => {
  setLoading(true);

  await updateDoc(doc(db, taskListColl, listId), { title });

  setLoading(false);

  dispatch(updateTaskListTitle({ id: listId, title: title }));
};

export const BE_saveTask = async (
  listId: string,
  data: TaskType,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const { id, title, description } = data;
  if (id) {
    const taskRef = doc(db, taskListColl, listId, tasksColl, id);
    await updateDoc(taskRef, { title, description });

    setLoading(false);
    dispatch(saveTask({ listId, taskId: id, title, description }));
  } else {
    toastErr("BE_saveTask: id not found");
  }
};

export const BE_deleteTaskList = async (
  listId: string,
  tasks: TaskType[],
  dispatch: AppDispatch,
  setLoading?: SetLoadingType
) => {
  if (setLoading) setLoading(true);

  if (tasks.length > 0) {
    const batch = writeBatch(db);
    tasks.forEach((e) => {
      if (e.id) {
        const taskRef = doc(db, taskListColl, listId, tasksColl, e.id);
        batch.delete(taskRef);
      }
    });
    await batch.delete;
  }

  const listRef = doc(db, taskListColl, listId);
  await deleteDoc(listRef);

  if (setLoading) setLoading(false);
  dispatch(deleteTaskList(listId));
};

export const BE_deleteTask = async (
  listId: string,
  id: string,
  dispatch: AppDispatch,
  setLoading?: SetLoadingType
) => {
  setLoading && setLoading(true);

  const taskRef = doc(db, taskListColl, listId, tasksColl, id);

  await deleteDoc(taskRef);

  setLoading && setLoading(false);
  dispatch(deleteTask({ listId, id }));
};
