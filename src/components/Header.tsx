import { useEffect, useState } from "react";
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import { BsFillChatFill } from "react-icons/bs";
import { FiList } from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { BE_signOut, getStorageUser } from "../backend/userQueries";
import Spinner from "./Spinner";
import { setUser } from "../redux/userSlice";
const logo = require("../assets/logo.png");

type HeaderProps = {};

function Header({}: HeaderProps) {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = getStorageUser();

  const handleNavigate = (page: string) => {
    navigate("/dashboard/" + page);
    setCurrentPage(page);
  };

  const handleSingOut = () => {
    BE_signOut(dispatch, navigate, setLoading);
  };

  const setCurrentPage = (page: string) => {
    localStorage.setItem("task-chat-page", page);
  };

  const getCurrentPage = () => {
    return localStorage.getItem("task-chat-page");
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(setUser(user));
      return;
    }
    navigate("/auth");
  }, [navigate, user?.id, dispatch]);

  return (
    <div className="flex items-center flex-wrap z-10 sm:flex-row gap-5 justify-between bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white drop-shadow-md">
      <img
        src={logo}
        alt="Logo icon"
        className="w-[70px] drop-shadow-md cursor-pointer"
      />
      <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">
        {getCurrentPage() === "chat" ? (
          <Icon
            IconName={FiList}
            onClick={() => handleNavigate("")}
            reduceOpacityOnHover
          />
        ) : getCurrentPage() === "profile" ? (
          <>
            <Icon
              IconName={FiList}
              onClick={() => handleNavigate("")}
              reduceOpacityOnHover
            />
            <Icon
              IconName={BsFillChatFill}
              onClick={() => handleNavigate("chat")}
              reduceOpacityOnHover
              ping
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              reduceOpacityOnHover
              IconName={BsFillChatFill}
              onClick={() => handleNavigate("chat")}
              ping
            />
          </>
        )}

        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1">
              <p
                onClick={() => handleNavigate("profile")}
                className="hover:bg-gray-200 py-2 px-2 block cursor-pointer"
              >
                Profile
              </p>
              <div
                onClick={() => !loading && handleSingOut()}
                className={`hover:bg-gray-200 py-2 px-2 cursor-pointer flex items-center gap-4 ${
                  loading && "cursor-wait"
                }`}
              >
                Logout
                {loading && <Spinner />}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
