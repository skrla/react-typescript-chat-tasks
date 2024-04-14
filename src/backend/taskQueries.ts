import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
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

  //TODO
  //Napraviti se doda samo id u postojeću task bez zvanja ponovo firebasea
  const docRef = doc(db, list.path);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const newlyAddedDoc: TaskListType = {
      id: docSnap.id,
      title: docSnap.data().title,
    };

    dispatch(addTaskList(newlyAddedDoc));
    setLoading(false);
  } else {
    toastErr("BE_addTaskList: No such doc");
    setLoading(false);
  }
};

export const BE_getTaskList = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const taskList = await getAllTaskList();

  dispatch(setTaskList(taskList));

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

  //TODO izbaciti ponovo zvanje getDoca
  const updatedTaskList = await getDoc(doc(db, taskListColl, listId));

  setLoading(false);

  dispatch(
    updateTaskListTitle({ id: updatedTaskList.id, ...updatedTaskList.data() })
  );
};

export const BE_deleteTaskList = async (
  listId: string,
  tasks: TaskType[],
  dispatch: AppDispatch,
  setLoading?: SetLoadingType
) => {
   if(setLoading) setLoading(true);

  if (tasks.length > 0) {
    //TODO probati sa foreach
    for (let i = 0; i < tasks.length; i++) {
      const { id } = tasks[i];
      if (id) BE_deleteTask(listId, id, dispatch);
    }
  }

  const listRef = doc(db, taskListColl, listId);
  //TODO bez poziva provjeriti je li obrisano
  await deleteDoc(listRef);

  const deletedTaskList = await getDoc(listRef);

  if (!deletedTaskList.exists()) {
    if(setLoading) setLoading(false);
    dispatch(deleteTaskList(listId));
  }
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

export const BE_deleteTask = async (
  listId: string,
  id: string,
  dispatch: AppDispatch,
  setLoading?: SetLoadingType
) => {
  setLoading && setLoading(true);

  const taskRef = doc(db, taskListColl, listId, tasksColl, id);

  //TODO bez poziva provjeriti jel obrisan
  await deleteDoc(taskRef);

  const deletedTask = await getDoc(taskRef);

  if (!deletedTask.exists()) {
    setLoading && setLoading(false);
    dispatch(deleteTask({ listId, id }));
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

  const newTaskSnapShot = await getDoc(doc(db, task.path));

  if (newTaskSnapShot.exists()) {
    const { title, description } = newTaskSnapShot.data();
    const newTask: TaskType = {
      id: newTaskSnapShot.id,
      title,
      description,
    };

    dispatch(addTask({ listId, newTask }));
  } else {
    toastErr("BE_addTask: No such document");
  }

  setLoading(false);
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

    //Todo izbaciti ovo
    const updatedTask = await getDoc(taskRef);
    setLoading(false);
    if (updatedTask) {
      dispatch(
        saveTask({ listId, taskId: updatedTask.id, ...updatedTask.data() })
      );
    } else {
      toastErr("BE_saveTask: doc not found");
    }
  } else {
    toastErr("BE_saveTask: id not found");
  }
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
