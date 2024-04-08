import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import Tasks from "./Tasks";
import { TaskListType } from "../types";
import { BE_deleteTaskList, BE_saveTaskList } from "../backend/taskQueries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { editTaskListSwitch } from "../redux/taskListSlice";

type SingleTaskListType = {
  singleTaskList: TaskListType;
};

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: SingleTaskListType,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, editMode, tasks, title } = singleTaskList;
    const [editTitle, setEditTitle] = useState(title);
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const handleSaveTaskListTitle = () => {
      if (id) BE_saveTaskList(dispatch, setLoading, id, editTitle);
    };

    const checkEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSaveTaskListTitle();
    };

    const handleDelete = () => {
      //TODO napraviti da tasks ne budu opcionalni u typovima
      if (id && tasks) BE_deleteTaskList(id, tasks, dispatch, setLoading);
    };

    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-40 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            {editMode ? (
              <input
                value={editTitle}
                onKeyDown={(e) => checkEnterKey(e)}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter task list title"
                type="text"
                className="flex-1 bg-transparent placeholder-gray-300 px-3 py-1 border-[1px] border-white rounded-md"
              />
            ) : (
              <p className="flex-1 text-left md:text-center">{title}</p>
            )}

            <div>
              <Icon
                IconName={editMode ? MdSave : MdEdit}
                onClick={() =>
                  editMode
                    ? handleSaveTaskListTitle()
                    : dispatch(editTaskListSwitch({ id }))
                }
                loading={editMode && loading}
              />
              <Icon
                IconName={MdDelete}
                loading={loading}
                onClick={handleDelete}
              />
              <Icon IconName={MdKeyboardArrowDown} />
            </div>
          </div>
          <Tasks />
        </div>
        <Icon
          IconName={MdAdd}
          reduceOpacityOnHover
          className="absolute -top-3 -left-5 drop-shadow-lg hover:bg-myPink"
        />
      </div>
    );
  }
);

export default SingleTaskList;
