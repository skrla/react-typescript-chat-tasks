import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setCurrentChat, setIsChatsTab } from "../redux/chatSlice";
import Chats from "./Chats";
import Users from "./Users";
import { BE_getAllUsers } from "../backend/userQueries";
import { defaultUser } from "../redux/userSlice";

function SideBarUsers() {
  const isChatsTab = useSelector((state: RootState) => state.chat.isChatTab);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleSelectedUsers = () => {
    dispatch(setIsChatsTab(false));
    dispatch(setCurrentChat(defaultUser));
  };

  useEffect(() => {
    const get = async () => {
      await BE_getAllUsers(dispatch, setLoading);
    };
    get();
  }, []);

  return (
    <SideBar
      className={`flex-[0.8] absolute z-10 w-[80%] h-[80%] md:h-full md:w-full md:relative md:z-0`}
    >
      <div className="flex flex-col">
        <div className="flex sticky top-0 z-10">
          <p
            onClick={() => dispatch(setIsChatsTab(true))}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              isChatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            Chats
          </p>
          <p
            onClick={handleSelectedUsers}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              !isChatsTab
                ? "bg-gradient-to-r from-myBlue to-myPink text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            Users
          </p>
        </div>
        <div className="flex flex-1 flex-col py-2 max-h-full overflow-y-scroll">
          {isChatsTab ? <Chats /> : <Users loading={loading} />}
        </div>
      </div>
    </SideBar>
  );
}

export default SideBarUsers;
