import { createSlice } from "@reduxjs/toolkit";
import { ChatType, MessageType, UserType } from "../types";
import { defaultUser } from "./userSlice";
import { iCreatedChat } from "../backend/chatQueries";

type ChatStateType = {
  chats: ChatType[];
  isChatTab: boolean;
  currentSelectedChat: UserType & {
    chatId?: string;
    senderToReceiverNewMsgCount?: number;
    receiverToSenderNewMsgCount?: number;
  };
  open: boolean;
  currentMessages: MessageType[];
  hasNewMessage: boolean;
};

const initialState: ChatStateType = {
  chats: [],
  isChatTab: false,
  currentSelectedChat: defaultUser,
  open: true,
  currentMessages: [],
  hasNewMessage: false,
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
      //TODO možda treba obrisati ovo
      const newMsgCount = state.chats.reduce((acc, c) => {
        if (iCreatedChat(c.senderId)) {
          return acc + (c.receiverToSenderNewMsgCount || 0);
        } else {
          return acc + (c.senderToReceiverNewMsgCount || 0);
        }
      }, 0);
      state.hasNewMessage = newMsgCount > 0;
    },
    setCurrentChat: (state, action) => {
      state.currentSelectedChat = action.payload;
    },
    setOpen: (state) => {
      state.open = !state.open;
    },
    setCurrentMessages: (state, action) => {
      state.currentMessages = action.payload;
    },
  },
});

export const {
  setIsChatsTab,
  setChats,
  setCurrentChat,
  setOpen,
  setCurrentMessages,
} = chatsSlice.actions;
export default chatsSlice.reducer;
