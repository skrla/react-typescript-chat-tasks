import React, { useEffect, useState } from "react";
import SingleTaskList from "../components/SingleTaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { BE_getTaskList } from "../backend/taskQueries";
import { ListLoader } from "../components/Loaders";
import FlipMove from "react-flip-move";
import { auth } from "../backend/firebaseConfig";

function ListPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const taskList = useSelector(
    (state: RootState) => state.taskList.currentTaskList
  );

  useEffect(() => {
    if (auth.currentUser) BE_getTaskList(dispatch, setLoading);
  }, [dispatch]);

  return (
    <div className="p-10">
      {loading ? (
        <ListLoader />
      ) : taskList.length === 0 ? (
        <h1 className="text-3xl text-center text-white mt-10">
          No task list added, add some!
        </h1>
      ) : (
        <FlipMove className="flex flex-wrap justify-center gap-10">
          {taskList.map((t) => (
            <SingleTaskList key={t.id} singleTaskList={t} />
          ))}
        </FlipMove>
      )}
    </div>
  );
}

export default ListPage;
