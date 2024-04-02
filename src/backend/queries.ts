import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { toastErr } from "../utils/toast";
import catchErr from "../utils/catchErr";
import { AuthDataType, SetLoadingType, UserType } from "../types";
import { NavigateFunction } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { defaultUser, setUser } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import convertTime from "../utils/convertTime";
import avatarGenerator from "../utils/avatarGenerator";

const userColl = "users";
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
        .then(async ({ user }) => {
          const imgLink = avatarGenerator(user.email?.split("@")[0] || "");

          const userInfo = await addUserToCollection(
            user.uid,
            user.email || "",
            user.email?.split("@")[0] || "",
            imgLink
          );

          dispatch(setUser(userInfo));

          setLoading(false);
          reset();
          navigate("/dashboard");
        })
        .catch((error) => {
          catchErr(error);
          setLoading(false);
        });
    } else {
      toastErr("Password must match", setLoading);
    }
  } else {
    toastErr("Fields shouldn't be left empty!", setLoading);
  }
};

export const BE_signIn = (
  data: AuthDataType,
  setLoading: SetLoadingType,
  reset: () => void,
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  const { email, password } = data;
  if (email && password) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {

        await updateUserInfo({id:user.uid, isOnline: true});

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
    toastErr("Fields shouldn't be left empty!", setLoading);
  }
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
    creationTime: creationTime
      ? convertTime(creationTime.toDate())
      : "No date yet: userinfo",
    lastSeen: lastSeen
      ? convertTime(lastSeen.toDate())
      : "No date yet: userinfo",
  };
};

const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
  isOffline,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
  isOffline?: boolean;
}) => {
  if(!id) {
    id = getStorageUser().id
  }

  if(id) {
    const docRef = doc(db, userColl, id);
    await updateDoc(docRef, {
      ...(username && { username }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      ...(img && { img }),
      lastSeen: serverTimestamp(),
    });
  }
};

const getStorageUser = () => {
  const user = localStorage.getItem("chatTasksUser");
  if(user) return JSON.parse(user);
  else return null;
}
