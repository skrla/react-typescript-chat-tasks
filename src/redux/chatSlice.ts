import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
