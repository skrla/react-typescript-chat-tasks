import React from "react";
import SideBarUsers from "../components/SideBarUsers";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import ChatArea from "../components/ChatArea";
import SideBarProfile from "../components/SideBarProfile";
const noChat = require("../assets/noChat.jpg");

function ChatPage() {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );

  return (
    <div className="h-full max-w-[1500px] flex justify-between m-auto p-3">
      <SideBarUsers />

      {currentSelectedChat?.id ? (
        <>
          <ChatArea />
          <SideBarProfile />
        </>
      ) : (
        <div className="hidden flex-[0.7] bg-white rounded-r-3xl shadow-md overflow-hidden lg:block">
          <img
            src={noChat}
            alt="No chat"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
