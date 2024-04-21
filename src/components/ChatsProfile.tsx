import React, { useEffect, useState } from "react";
import { ChatType, UserType } from "../types";
import { getUserInfo } from "../backend/userQueries";
import UserHeaderProfile from "./UserHeaderProfile";
import { defaultUser } from "../redux/userSlice";
import { iCreatedChat } from "../backend/chatQueries";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setCurrentChat, setOpen } from "../redux/chatSlice";

type ChatsProfileType = {
  userId?: string;
  chat: ChatType;
};

function ChatsProfile({ userId, chat }: ChatsProfileType) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>(defaultUser);
  const dispatch = useDispatch<AppDispatch>();
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );
  const {
    id,
    senderId,
    lastMsg,
    receiverToSenderNewMsgCount,
    senderToReceiverNewMsgCount,
  } = chat;

  const handleSelectedChat = () => {
    dispatch(
      setCurrentChat({
        ...user,
        chatId: id,
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      })
    );
    dispatch(setOpen());
  };

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const usr = await getUserInfo(userId, setLoading);
        if (usr.id !== "") {
          setUser(usr);
        }
      }
    };
    getUser();
  }, [userId]);

  return (
    <UserHeaderProfile
      key={userId}
      user={user}
      otherUser
      loading={loading}
      lastMsg={lastMsg}
      onClick={handleSelectedChat}
      isSelected={userId === currentSelectedChat.id}
      newMsgCount={
        iCreatedChat(senderId)
          ? receiverToSenderNewMsgCount
          : senderToReceiverNewMsgCount
      }
    />
  );
}

export default ChatsProfile;
