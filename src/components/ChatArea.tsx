import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import {
  BsFillCameraFill,
  BsFillEmojiSunglassesFill,
  BsFillPeopleFill,
  BsFillSendFill,
} from "react-icons/bs";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ImAttachment } from "react-icons/im";
import { setOpen } from "../redux/chatSlice";
import { BE_getMsgs, BE_sendMsgs, iCreatedChat } from "../backend/chatQueries";
import { MessagesLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { toastInfo } from "../utils/toast";
import { getStorageUser } from "../backend/userQueries";
import SingleMessage from "./SingleMessage";

function ChatArea() {
  const bottomContainerRef = useRef<HTMLDivElement>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMessageLoading, setNewMessageLoading] = useState(false);
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const messages = useSelector(
    (state: RootState) => state.chat.currentMessages
  );
  const chatId = currentSelectedChat.chatId;
  const dispatch = useDispatch<AppDispatch>();

  const handleSendMsg = async () => {
    if (msg.trim()) {
      const data = {
        senderId: getStorageUser().id,
        content: msg,
      };
      setMsg("");
      if (chatId) await BE_sendMsgs(chatId, data, setNewMessageLoading);
      if (bottomContainerRef)
        bottomContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      toastInfo("Enter some text message!");
    }
  };

  const checkEnter = (e: any) => {
    if (e.key === "Enter") handleSendMsg();
  };

  useEffect(() => {
    const get = async () => {
      if (chatId) await BE_getMsgs(dispatch, chatId, setLoading);
    };
    get();
  }, [currentSelectedChat.id]);

  return (
    <div className="flex-1 lg:flex-[0.4] max-h-full flex flex-col px-2 md:px-5 gap-2">
      {loading && messages ? (
        <MessagesLoader />
      ) : (
        <div className="flex-1 flex flex-col max-h-screen overflow-y-scroll no-scrollbar shadow-inner gap-2">
          <FlipMove className="flex flex-1 flex-col gap-5">
            {messages.map((e) => {
              if (iCreatedChat(e.senderId)) {
                return (
                  <SingleMessage key={e.id} myMessage content={e.content} />
                );
              } else {
                return <SingleMessage key={e.id} content={e.content} />;
              }
            })}
          </FlipMove>
          <div ref={bottomContainerRef} className="pb-8 flex "></div>
        </div>
      )}
      <div className="flex gap-1 md:gap-5">
        <div className="bg-white p-[2px] flex-1 rounded-full shadow-md flex items-center gap-2 border-2 border-gray-300">
          <Icon
            IconName={BsFillPeopleFill}
            className="text-gray-500 block md:hidden"
            reduceOpacityOnHover
            size={15}
            onClick={() => dispatch(setOpen())}
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
            onKeyDown={checkEnter}
            disabled={newMessageLoading}
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
          <Icon
            IconName={BsFillSendFill}
            reduceOpacityOnHover
            onClick={handleSendMsg}
            loading={newMessageLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
