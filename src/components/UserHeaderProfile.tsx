import React from "react";
import { UserType } from "../types";

type Props = {
  user: UserType;
  onClick?: () => void;
};

function UserHeaderProfile({ user, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center space-x-4 cursor-pointer"
    >
      <div className="relative">
        <img
          src={user.img}
          alt="User profile"
          className="w-11 h-11 rounded-full ring-2 ring-white p-[2px]"
        />
        <span className="-top-1 -right-1 absolute w-4 h-4 border-2 border-gray-800 rounded-full bg-green-400"></span>
      </div>
      <div className="hidden md:block">
        <div className="-mb-1">{user.username}</div>
        <div className="text-sm text-gray-300">Joined in {user.creationTime}</div>
      </div>
    </div>
  );
}

export default UserHeaderProfile;
