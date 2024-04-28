import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setCurrentChat, setIsChatsTab } from "../redux/chatSlice";
import Users from "./UsersTab";
import { BE_getAllUsers } from "../backend/userQueries";
import { defaultUser } from "../redux/userSlice";
import ChatsTab from "./ChatsTab";

function SideBarUsers() {
  const isChatsTab = useSelector((state: RootState) => state.chat.isChatTab);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const open = useSelector((state: RootState) => state.chat.open);

  const handleSelectedUsers = () => {
    dispatch(setIsChatsTab(false));
    dispatch(setCurrentChat(defaultUser));
  };

  useEffect(() => {
    const get = async () => {
      await BE_getAllUsers(dispatch, setLoading);
    };
    get();
  }, [dispatch]);

  return (
    <SideBar
      className={`flex-[0.8] absolute z-10 w-[80%] h-[80%] -my-3 md:m-0 sm:bg-customBlack md:h-full md:w-full md:relative md:z-0 ${
        open ? "translate-x-0" : "-translate-x-[150%] md:translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex sticky top-0 z-10">
          <p
            onClick={() => dispatch(setIsChatsTab(true))}
            className={`p-5 flex-1 text-center font-bold rounded-tl-3xl cursor-pointer ${
              isChatsTab
                ? "bg-gradient-to-r from-customGreen to-eggPlant text-white"
                : "bg-customBlackHover text-white"
            }`}
          >
            Chats
          </p>
          <p
            onClick={handleSelectedUsers}
            className={`p-5 flex-1 text-center font-bold cursor-pointer ${
              !isChatsTab
                ? "bg-gradient-to-r from-customGreen to-eggPlant text-white"
                : "bg-customBlackHover text-white"
            } rounded-tr-3xl`}
          >
            Users
          </p>
        </div>
        <div className="flex flex-1 flex-col py-2 max-h-full overflow-y-scroll no-scrollbar">
          {isChatsTab ? <ChatsTab /> : <Users loading={loading} />}
        </div>
      </div>
    </SideBar>
  );
}

export default SideBarUsers;
