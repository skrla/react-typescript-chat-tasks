import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SideBar from "./SideBar";

function SideBarProfile() {
  const currentSelectedChat = useSelector(
    (state: RootState) => state.chat.currentSelectedChat
  );

  const { id, email, img, username, isOnline, bio, lastSeen, creationTime } =
    currentSelectedChat;

  return (
    <SideBar isRight className="hidden md:block ">
      <div className="flex flex-col rounded-r-3xl">
        <div className="bg-customBlackHover h-16 sticky m-4 flex items-center justify-center rounded-3xl">
          {username && (
            <p className="font-bold text-xl text-white">{username}</p>
          )}
        </div>
        {id ? (
          <div className="flex p-10 flex-col">
            <div className="relative self-center">
              <img
                src={img}
                alt={username}
                className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[2px] ring ring-gray-300 cursor-pointer hover:shadow-lg"
              />
              <span
                className={`absolute top-4 md:top-6 right-0 md:right-3 w-5 h-5 border-2 border-gray-800 rounded-full z-20 ${
                  isOnline ? "bg-green-400" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <hr />
              <p className="text-gray-300">
                Email: <span className="text-white">{email}</span>
              </p>
              <p className="text-gray-300">
                Joined in: <span className="text-white">{creationTime}</span>
              </p>
              <p className="text-gray-300">
                Last Seen: <span className="text-white">{lastSeen}</span>
              </p>
              <p className="text-gray-300">
                Bio: <span className="text-white">{bio}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="p-10">
            No chat selected yet, select a chat to see user <details></details>
          </div>
        )}
      </div>
    </SideBar>
  );
}

export default SideBarProfile;
