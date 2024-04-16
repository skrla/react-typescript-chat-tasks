import React from "react";
import { UsersLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import UserHeaderProfile from "./UserHeaderProfile";
import { setAlertProps } from "../redux/userSlice";

type UsersProps = {
  loading: boolean;
};

function Users({ loading }: UsersProps) {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch<AppDispatch>();

  const handleStartChat = (receiverId: string, receiverName: string) => {
    dispatch(setAlertProps({ open: true, receiverId, receiverName }));
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
          onClick={() => handleStartChat(e.id, e.username)}
        />
      ))}
    </FlipMove>
  );
}

export default Users;
