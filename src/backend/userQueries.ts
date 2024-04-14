import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { toastErr, toastSucc } from "../utils/toast";
import catchErr from "../utils/catchErr";
import { AuthDataType, SetLoadingType, UserType } from "../types";
import { NavigateFunction } from "react-router";
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  defaultUser,
  setUser,
  setUsers,
  userStorageInfo,
} from "../redux/userSlice";
import { AppDispatch } from "../redux/store";
import convertTime from "../utils/convertTime";
import avatarGenerator from "../utils/avatarGenerator";
import { BE_deleteTaskList, getAllTaskList } from "./taskQueries";

const userColl = "users";
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
        await updateUserInfo({ id: user.uid, isOnline: true });

        const userInfo = await getUserInfo(user.uid);

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
    toastErr("Fields shouldn't be left empty!", setLoading);
  }
};

export const BE_signOut = async (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  await updateUserInfo({ isOffline: true });
  signOut(auth)
    .then(() => {
      navigate("/auth");

      dispatch(setUser(defaultUser));

      localStorage.removeItem(userStorageInfo);
      setLoading(false);
    })
    .catch((err) => catchErr(err));
};

export const getStorageUser = () => {
  const user = localStorage.getItem(userStorageInfo);
  if (user) return JSON.parse(user);
  else return null;
};

export const BE_saveProfile = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType,
  data: { email: string; username: string; password: string; img: string }
) => {
  setLoading(true);
  const { email, username, password, img } = data;
  const id = getStorageUser().id;

  if (id && auth.currentUser) {
    if (email) {
      updateEmail(auth.currentUser, email)
        .then(async () => {
          await updateUserInfo({ email });
          toastSucc("Email updated successfully");
        })
        .catch((err) => catchErr(err));
    }

    if (password) {
      updatePassword(auth.currentUser, password)
        .then(() => {
          toastSucc("Password updated successfully");
        })
        .catch((err) => catchErr(err));
    }

    if (username || img) {
      await updateUserInfo({ username, img });
      toastSucc("Updated profile successfully!");
    }

    const userInfo = await getUserInfo(id);

    dispatch(setUser(userInfo));
    setLoading(false);
  } else {
    toastErr("BE_saveProfile: id not found");
    setLoading(false);
  }
};

export const BE_deleteAccount = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const userTaskList = await getAllTaskList();

  if (userTaskList.length > 0) {
    userTaskList.forEach(async (e) => {
      if (e.id && e.tasks) await BE_deleteTaskList(e.id, e.tasks, dispatch);
    });
  }

  await deleteDoc(doc(db, userColl, getStorageUser().id));

  const user = auth.currentUser;

  if (user) {
    deleteUser(user)
      .then(async () => {
        localStorage.removeItem(userStorageInfo);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => catchErr(error));
  }
};

export const BE_getAllUsers = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const q = query(
    collection(db, userColl),
    where(documentId(), "!=", getStorageUser().id),
    orderBy("isOnline", "desc")
  );

  onSnapshot(q, (usersSnapshot) => {
    let users: UserType[] = [];

    usersSnapshot.forEach((user) => {
      const { img, isOnline, username, email, bio, creationTime, lastSeen } =
        user.data();
      users.push({
        id: user.id,
        img,
        isOnline,
        username,
        email,
        bio,
        creationTime: convertTime(creationTime.toDate()),
        lastSeen: convertTime(lastSeen.toDate()),
      });
    });

    console.log(users);
    dispatch(setUsers(users));
    setLoading(false);
  });
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
  email,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
  isOffline?: boolean;
  email?: string;
}) => {
  if (!id) {
    id = getStorageUser().id;
  }

  if (id) {
    const docRef = doc(db, userColl, id);
    await updateDoc(docRef, {
      ...(username && { username }),
      ...(email && { email }),
      ...(isOnline && { isOnline }),
      ...(isOffline && { isOnline: false }),
      ...(img && { img }),
      lastSeen: serverTimestamp(),
    }).catch((err) => catchErr(err));
  }
};
