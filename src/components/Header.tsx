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
import { BE_getChats } from "../backend/chatQueries";
const logo = require("../assets/logo.png");

function Header() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const hasNewMessage = useSelector(
    (state: RootState) => state.chat.hasNewMessage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    const user = getStorageUser();
    if (user?.id) {
      dispatch(setUser(user));
      return;
    }
    navigate("/auth");
  }, [navigate, dispatch]);

  useEffect(() => {
    const currentPage = getCurrentPage();
    if (currentPage) handleNavigate(currentPage);
  }, []);

  useEffect(() => {
    const get = async () => {
      if (currentUser.id) await BE_getChats(dispatch);
    };
    get();
  }, [dispatch, currentUser.id]);

  return (
    <div className="flex items-center flex-wrap z-10 sm:flex-row gap-5 justify-between bg-gradient-to-r from-customGreen to-eggPlant px-5 py-5 md:py-2 text-white drop-shadow-md">
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
              ping={hasNewMessage}
            />
          </>
        ) : (
          <>
            <AddListBoard />
            <Icon
              reduceOpacityOnHover
              IconName={BsFillChatFill}
              onClick={() => handleNavigate("chat")}
              ping={hasNewMessage}
            />
          </>
        )}

        <div className="group relative">
          <UserHeaderProfile user={currentUser} />
          <div className="absolute pt-5 hidden group-hover:block w-full min-w-max">
            <ul className="w-full bg-customBlack overflow-hidden rounded-md shadow-md text-white pt-1">
              <p
                onClick={() => handleNavigate("profile")}
                className="hover:bg-customBlackHover py-2 px-2 block cursor-pointer"
              >
                Profile
              </p>
              <div
                onClick={() => !loading && handleSingOut()}
                className={`hover:bg-customBlackHover py-2 px-2 cursor-pointer flex items-center gap-4 ${
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
