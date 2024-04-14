import React from "react";
import { UsersLoader } from "./Loaders";

type UsersProps = {
  loading: boolean;
};

function Users({ loading }: UsersProps) {
  return loading ? (
    <UsersLoader />
  ) : Users.length === 0 ? (
    <div className="p-10">
      No users register apart from you, tell others to register &#128517;
    </div>
  ) : (
    <div>Users here</div>
  );
}

export default Users;
