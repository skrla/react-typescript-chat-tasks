import React, { forwardRef } from "react";
import { UserType } from "../types";
import { UsersLoader } from "./Loaders";
import truncate from "../utils/truncateText";

type Props = {
  user: UserType;
  onClick?: () => void;
  otherUser?: boolean;
  lastMsg?: string;
  loading?: boolean;
  newMsgCount?: number;
  isSelected?: boolean;
};

const UserHeaderProfile = forwardRef(
  (
    {
      user,
      onClick,
      otherUser,
      lastMsg,
      loading,
      newMsgCount,
      isSelected,
    }: Props,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    return !loading && user ? (
      <div
        ref={ref}
        onClick={onClick}
        className={`flex items-center justify-center space-x-4 cursor-pointer ${
          otherUser &&
          "group px-5 py-3 hover:bg-gray-200 border-b-[1px] border-gray-200"
        } ${isSelected && "bg-gray-200"}`}
      >
        <div className="relative">
          <img
            src={user.img}
            alt="User profile"
            className={`w-11 h-11 rounded-full ring-2 p-[2px] hover:shadow-lg ${
              otherUser
                ? "ring-gray-300 group-hover:ring-gray-400"
                : "ring-white"
            } ${isSelected && "ring-gray-400"}`}
          />
          <span
            className={`-top-1 -right-1 absolute w-4 h-4 border-2 border-gray-800 rounded-full ${
              user.isOnline ? "bg-green-400" : "bg-gray-400"
            } `}
          ></span>
        </div>
        <div className={`${!otherUser && "hidden md:block"}`}>
          <div
            className={`-mb-1 flex items-center gap-2 ${
              otherUser && "text-gray-600 group-hover:text-gray-900"
            }
            ${isSelected && "text-gray-900"}`}
          >
            {user.username}
            {newMsgCount && newMsgCount > 0 ? (
              <p className="bg-myPink w-auto min-w-[20px] max-w-[28px] h-5 p-1 rounded-full flex items-center justify-center text-white">
                {newMsgCount}
              </p>
            ) : (
              ""
            )}
          </div>
          <div
            className={`text-sm  ${
              otherUser
                ? "text-gray-400 group-hover:text-gray-500"
                : "text-gray-300"
            }
            ${isSelected && "text-gray-500"}`}
          >
            {otherUser
              ? `${lastMsg ? truncate(lastMsg) : "Last Seen: " + user.lastSeen}`
              : `Joined in ${user.creationTime}`}
          </div>
        </div>
      </div>
    ) : (
      <UsersLoader />
    );
  }
);

export default UserHeaderProfile;
