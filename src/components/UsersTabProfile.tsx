import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setAlertProps } from "../redux/userSlice";
import { UserType } from "../types";
import UserHeaderProfile from "./UserHeaderProfile";

type UserTabProfileProps = {
  user: UserType;
};

const UsersTabProfile = forwardRef(
  (
    { user }: UserTabProfileProps,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleStartChat = (receiverId: string, receiverName: string) => {
      dispatch(setAlertProps({ open: true, receiverId, receiverName }));
    };
    return (
      <div ref={ref}>
        <UserHeaderProfile
          user={user}
          otherUser
          onClick={() => handleStartChat(user.id, user.username)}
        />
      </div>
    );
  }
);

export default UsersTabProfile;
