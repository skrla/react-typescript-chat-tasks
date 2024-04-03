import React from "react";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
const logo = require("../assets/logo.png");

type HeaderProps = {};

function Header({}: HeaderProps) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="flex items-center flex-wrap sm:flex-row gap-5 justify-between bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white drop-shadow-md">
      <img
        src={logo}
        alt="Logo icon"
        className="w-[70px] drop-shadow-md cursor-pointer"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        <AddListBoard />
        <Icon IconName={BsFillChatFill} ping />
        <Icon IconName={FiList} />
        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <Link to="profile" className="hover:bg-gray-200 py-2 px-2 block">
                Profile
              </Link>
              <Link to="/auth" className="hover:bg-gray-200 py-2 px-2 block">
                Logout
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
