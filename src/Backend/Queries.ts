import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { toastErr } from "../utils/toast";
import catchErr from "../utils/catchErr";
import { AuthDataType, SetLoadingType, UserType } from "../types";
import { NavigateFunction } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";

const userColl = "tasks";
const tasksColl = "tasks";
const taskListColl = "taskList";
const chatColl = "chat";
const messagesColl = "messages";

export const BE_signUp = (
  data: AuthDataType,
  setLoading: SetLoadingType,
  reset: () => void,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password, confirmPassword } = data;
  if (email && password) {
    if (password === confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          const userInfo = addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            "imgLink"
          );

          dispatch(setUser(userInfo));

          setLoading(false);
          reset();
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          catchErr(error);
          setLoading(false);
        });
    } else {
      toastErr("Password must match");
    }
  } else {
    toastErr("Fields shouldn't be left empty!");
  }
};

export const BE_signIn = (
  data: AuthDataType,
  setLoading: SetLoadingType,
  reset: () => void,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  try {
    const { email, password } = data;
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          const userInfo = await getUserInfo(user.uid);

          dispatch(setUser(userInfo));

          console.log(user);
          setLoading(false);
          reset();
          navigate("/dashboard");
        })
        .catch((error) => {
          catchErr(error);
          setLoading(false);
        });
    } else {
      toastErr("Fields shouldn't be left empty!");
      setLoading(false);
    }
  } catch (err) {}
};

const addUserToCollection = async (
  id: string,
  email: string,
  username: string,
  img: string
) => {
  await setDoc(doc(db, userColl, id), {
    isOnline: true,
    img,
    username,
    email,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: "",
  });
  return getUserInfo(id);
};

const getUserInfo = async (id: string): Promise<UserType> => {
  const docRef = doc(db, userColl, id);
  const user = await getDoc(docRef);

  if (!user.exists()) {
    toastErr("User not found");
    return defaultUser;
  }

  const { img, isOnline, username, email, bio, creationTime, lastSeen } =
    user.data();
  return {
    id: user.id,
    img,
    isOnline,
    username,
    email,
    bio,
    creationTime,
    lastSeen,
  };
};
