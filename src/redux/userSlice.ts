import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types";

export const defaultUser: UserType = {
  id: "",
  username: "",
  email: "",
  img: "",
  isOnline: false,
  creationTime: "",
  lastSeen: "",
  bio: "",
};

export const userStorageInfo = "chatTasksUser";

type InitialStateUserType = {
  users: UserType[];
  currentUser: UserType;
  currentSelectedUser: null;
  alertProps: {
    open: boolean;
    receiverId?: string;
    receiverName?: string;
  };
};

const initialState: InitialStateUserType = {
  users: [],
  currentUser: defaultUser,
  currentSelectedUser: null,
  alertProps: {
    open: false,
    receiverId: "",
    receiverName: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem(userStorageInfo, JSON.stringify(user));
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setAlertProps: (state, action) => {
      const { open, receiverId, receiverName } = action.payload;
      state.alertProps = action.payload;
    },
  },
});

export const { setUser, setUsers, setAlertProps } = userSlice.actions;

export default userSlice.reducer;
