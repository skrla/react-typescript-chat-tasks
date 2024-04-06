import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { AppDispatch } from "../redux/store";
import { addTaskList, defaultTask, defaultTaskList } from "../redux/taskListSlice";
import { SetLoadingType, TaskListType } from "../types";
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
  const docRef = doc(db, list.path)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    const newlyAddedDoc:TaskListType = {
        id: docSnap.id,
        title: docSnap.data().title
    }

    dispatch(addTaskList(newlyAddedDoc))
    setLoading(false);
  } else {
    toastErr("BE_addTaskList: No such doc")
    setLoading(false)
  }
};
