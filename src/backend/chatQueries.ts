import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { AppDispatch } from "../redux/store";
import { ChatType, MessageType, SetLoadingType } from "../types";
import { getStorageUser, updateUserInfo } from "./userQueries";
import { db } from "./firebaseConfig";
import { toastErr } from "../utils/toast";
import { setAlertProps } from "../redux/userSlice";
import { setChats } from "../redux/chatSlice";
import convertTime from "../utils/convertTime";

const chatColl = "chats";
const messagesColl = "messages";

export const BE_startChat = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType,
  receiverId: string,
  receiverName: string
) => {
  setLoading(true);

  const sId = getStorageUser().id;

  const q = query(
    collection(db, chatColl),
    or(
      and(where("senderId", "==", sId), where("receiverId", "==", receiverId)),
      and(where("senderId", "==", receiverId), where("receiverId", "==", sId))
    )
  );

  const res = await getDocs(q);

  if (res.empty) {
    const newChat = await addDoc(collection(db, chatColl), {
      senderId: sId,
      receiverId: receiverId,
      lastMsg: "",
      updatedAt: serverTimestamp(),
      senderToReceiverNewMsgCount: 0,
      receiverToSenderNewMsgCount: 0,
    });

    const newChatSnapshot = await getDoc(doc(db, newChat.path));
    if (!newChatSnapshot.exists()) {
      toastErr("BE_startChat: No such document!");
    }
  } else {
    toastErr(`You already started chatting with ${receiverName}`);
  }

  setLoading(false);
  dispatch(setAlertProps({ open: false }));
};

export const BE_getChats = async (dispatch: AppDispatch) => {
  const id = getStorageUser().id;

  const q = query(
    collection(db, chatColl),
    or(where("senderId", "==", id), where("receiverId", "==", id)),
    orderBy("updatedAt", "desc")
  );

  onSnapshot(q, (chatSnapshot) => {
    const chats: ChatType[] = [];

    chatSnapshot.forEach((chat) => {
      const {
        senderId,
        receiverId,
        lastMsg,
        updatedAt,
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      } = chat.data();
      chats.push({
        id: chat.id,
        senderId,
        receiverId,
        lastMsg,
        updatedAt: updatedAt ? convertTime(updatedAt.toDate()) : "No date",
        receiverToSenderNewMsgCount,
        senderToReceiverNewMsgCount,
      });
    });

    dispatch(setChats(chats));
  });
};

export const iCreatedChat = (senderId: string) => {
  return getStorageUser().id === senderId;
};

export const BE_getMsgs = async (dispatch: AppDispatch) => {};

export const BE_sendMsgs = async (
  chatId: string,
  data: MessageType,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const res = await addDoc(collection(db, chatColl, chatId, messagesColl), {
    ...data,
    createdAt: serverTimestamp(),
  });

  const newMsg = await getDoc(doc(db, res.path));

  if (newMsg.exists()) {
    setLoading(false);
    await updateNewMsgCount(chatId, true);
    await updateLastMsg(chatId, newMsg.data().content);
    await updateUserInfo({});
  }
};

export const updateNewMsgCount = async (chatId: string, reset?: boolean) => {
  const chat = await getDoc(doc(db, chatColl, chatId));

  let senderToReceiverNewMsgCount = chat.data()?.senderToReceiverNewMsgCount;
  let receiverToSenderNewMsgCount = chat.data()?.receiverToSenderNewMsgCount;

  if (iCreatedChat(chat.data()?.senderId)) {
    if (reset) receiverToSenderNewMsgCount = 0;
    else senderToReceiverNewMsgCount++;
  } else {
    if (reset) senderToReceiverNewMsgCount = 0;
    else receiverToSenderNewMsgCount++;
  }

  await updateDoc(doc(db, chatColl, chatId), {
    updatedAt: serverTimestamp(),
    senderToReceiverNewMsgCount,
    receiverToSenderNewMsgCount,
  });
};

const updateLastMsg = async (chatId: string, lastMsg: string) => {
  await updateNewMsgCount(chatId);

  await updateDoc(doc(db, chatColl, chatId), {
    lastMsg,
    updatedAt: serverTimestamp(),
  });
};
