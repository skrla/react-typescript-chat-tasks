import React, { useState } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { BE_addTaskList } from "../backend/taskQueries";

function AddListBoard() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTaskList = () => {
    BE_addTaskList(dispatch, setLoading);
  };

  return (
    <>
      <Button
        text="Add New List Board"
        className="hidden md:flex"
        loading={loading}
        onClick={handleAddTaskList}
      />
      <Icon
        IconName={MdAdd}
        className="block md:hidden"
        loading={loading}
        onClick={handleAddTaskList}
      />
    </>
  );
}

export default AddListBoard;
