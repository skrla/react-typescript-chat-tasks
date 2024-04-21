import React, { useState } from "react";
import Icon from "./Icon";
import {
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
  BsFillSendFill,
} from "react-icons/bs";
import Input from "./Input";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ImAttachment } from "react-icons/im";

function ChatArea() {
  const [msg, setMsg] = useState("");
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2">
      <div className="flex-1 border-2 border-black"></div>
      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-gray-300">
          <Icon
            IconName={BsFillPeopleFill}
            className="text-gray-500 block md:hidden"
            reduceOpacityOnHover
            size={15}
          />
          <Icon
            IconName={BsFillEmojiSunglassesFill}
            className="text-gray-500 hidden md:block"
          />
          <Input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            name={`message to ${currentSelectedChat?.username}`}
            className="border-none outline-none text-sm md:text-[15px]"
          />
          <Icon
            IconName={ImAttachment}
            className="text-gray-500 hidden md:block rotate-90"
          />
          <Icon
            IconName={BsFillCameraFill}
            className="text-gray-500 hidden md:block"
          />
        </div>

        <div className="flex items-center justify-center">
          <Icon IconName={BsFillSendFill} reduceOpacityOnHover />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
