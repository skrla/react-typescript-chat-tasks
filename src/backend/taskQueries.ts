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
  addTaskList,
  defaultTask,
  defaultTaskList,
  deleteTaskList,
  setTaskList,
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
  setLoading: SetLoadingType
) => {
  setLoading(true);

  if (tasks.length > 0) {
    //TODO probati sa foreach
    for (let i = 0; i < tasks.length; i++) {
      const { id } = tasks[i];
      if (id) BE_deleteTask(listId, id, dispatch, setLoading);
    }
  }

  const listRef = doc(db, taskListColl, listId);
  //TODO bez poziva provjeriti je li obrisano
  await deleteDoc(listRef);

  const deletedTaskList = await getDoc(listRef);

  if (!deletedTaskList.exists()) {
    setLoading(false);
    dispatch(deleteTaskList(listId));
  }
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
    //dispatch(deleteTask);
  }
};

const getAllTaskList = async () => {
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
