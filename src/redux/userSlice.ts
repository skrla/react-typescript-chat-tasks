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

const initialState = {
  user: [],
  currentUser: defaultUser,
  currentSelectedUser: null,
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
    setUsers: (state, action) => {},
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
