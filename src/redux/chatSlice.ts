import { createSlice } from "@reduxjs/toolkit";
import { ChatType, UserType } from "../types";
import { defaultUser } from "./userSlice";

type ChatStateType = {
  chats: ChatType[];
  isChatTab: boolean;
  currentSelectedChat: UserType;
};

const initialState: ChatStateType = {
  chats: [],
  isChatTab: false,
  currentSelectedChat: defaultUser,
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatsTab: (state, action: { payload: boolean; type: string }) => {
      state.isChatTab = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentSelectedChat = action.payload;
    },
  },
});

export const { setIsChatsTab, setChats, setCurrentChat } = chatsSlice.actions;
export default chatsSlice.reducer;
