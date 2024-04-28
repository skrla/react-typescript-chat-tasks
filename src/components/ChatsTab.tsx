import React from "react";
import {  useSelector } from "react-redux";
import {  RootState } from "../redux/store";
import ChatsProfile from "./ChatsProfile";
import { iCreatedChat } from "../backend/chatQueries";
import FlipMove from "react-flip-move";

function ChatsTab() {
  const chats = useSelector((state: RootState) => state.chat.chats);

  return chats.length === 0 ? (
    <div className="p-10">
      No chats yet for you, chose a user and start chatting &#128517;
    </div>
  ) : (
    <FlipMove>
      {chats.map((e) => (
        <ChatsProfile
          chat={e}
          key={e.id}
          userId={iCreatedChat(e.senderId) ? e.receiverId : e.senderId}
        />
      ))}
    </FlipMove>
  );
}

export default ChatsTab;
