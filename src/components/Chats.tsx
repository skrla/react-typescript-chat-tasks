import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import FlipMove from "react-flip-move";
import ChatsProfile from "./ChatsProfile";
import { iCreatedChat } from "../backend/chatQueries";

function Chats() {
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch<AppDispatch>();

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

export default Chats;
