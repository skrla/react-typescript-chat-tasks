import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import { toastErr } from "../utils/toast";
import catchErr from "../utils/catchErr";
import { AuthDataType, SetLoadingType } from "../types";

export const BE_signUp = (
  data: AuthDataType,
  setLoading: SetLoadingType,
  reset: () => void
) => {
  const { email, password, confirmPassword } = data;
  if (email && password) {
    if (password === confirmPassword) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          reset();
        })
        .catch((error) => {
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
  reset: () => void
) => {
  const { email, password } = data;
  if (email && password) {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        reset();
        // ...
      })
      .catch((error) => {
        catchErr(error);
        setLoading(false);
      });
  } else {
    toastErr("Fields shouldn't be left empty!");
    setLoading(false);
  }
};
