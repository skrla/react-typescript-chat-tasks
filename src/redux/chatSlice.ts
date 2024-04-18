import { createSlice } from "@reduxjs/toolkit";
import { ChatType } from "../types";

type ChatStateType = {
  chats: ChatType[];
  isChatTab: boolean;
};

const initialState: ChatStateType = {
  chats: [],
  isChatTab: false,
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
  },
});

export const { setIsChatsTab, setChats } = chatsSlice.actions;
export default chatsSlice.reducer;
