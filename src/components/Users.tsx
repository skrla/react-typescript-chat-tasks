import React from "react";
import { UsersLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UserHeaderProfile from "./UserHeaderProfile";

type UsersProps = {
  loading: boolean;
};

function Users({ loading }: UsersProps) {
  const users = useSelector((state: RootState) => state.user.users);

  const handleStartChat = () => {
    alert("Start chat");
  };

  return loading ? (
    <UsersLoader />
  ) : users.length === 0 ? (
    <div className="p-10">
      No users register apart from you, tell others to register &#128517;
    </div>
  ) : (
    <FlipMove>
      {users.map((e) => (
        <UserHeaderProfile
          key={e.id}
          user={e}
          otherUser
          onClick={handleStartChat}
        />
      ))}
    </FlipMove>
  );
}

export default Users;
