import React, { useEffect, useState } from "react";
import { ChatType, UserType } from "../types";
import { getUserInfo } from "../backend/userQueries";
import UserHeaderProfile from "./UserHeaderProfile";

type ChatsProfileType = {
  userId?: string;
  chat: ChatType;
};

function ChatsProfile({ userId, chat }: ChatsProfileType) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  const handleSelectedChat = () => {};

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

  return user ? (
    <UserHeaderProfile
      key={userId}
      user={user}
      otherUser
      onClick={() => handleSelectedChat()}
    />
  ) : (
    <h2>User</h2>
  );
}

export default ChatsProfile;
