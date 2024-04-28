import { UsersLoader } from "./Loaders";
import FlipMove from "react-flip-move";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import UsersTabProfile from "./UsersTabProfile";

type UsersProps = {
  loading: boolean;
};

function UsersTab({ loading }: UsersProps) {
  const users = useSelector((state: RootState) => state.user.users);

  return loading ? (
    <UsersLoader />
  ) : users.length === 0 ? (
    <div className="p-10">
      No users register apart from you, tell others to register &#128517;
    </div>
  ) : (
    <FlipMove>
      {users.map((e) => (
        <UsersTabProfile key={e.id} user={e} />
      ))}
    </FlipMove>
  );
}

export default UsersTab;
