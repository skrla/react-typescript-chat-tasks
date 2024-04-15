import React from "react";
import SideBarUsers from "../components/SideBarUsers";
const noChat = require("../assets/noChat.jpg");

function ChatPage() {
  return (
    <div className="h-full max-w-[1500px] flex justify-between m-auto p-3">
      <SideBarUsers />
      <div className="hidden flex-[0.7] bg-white rounded-r-3xl shadow-md overflow-hidden lg:block">
        <img
          src={noChat}
          alt="No chat"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default ChatPage;
