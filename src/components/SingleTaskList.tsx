import React, { forwardRef } from "react";
import Icon from "./Icon";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import Tasks from "./Tasks";
import { TaskListType } from "../types";

type SingleTaskListType = {
  singleTaskList: TaskListType;
};

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: SingleTaskListType,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, editMode, tasks, title } = singleTaskList;

    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-40 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-myBlue to-myPink bg-opacity-70 p-3 text-white text-center">
            <p className="flex-1 text-left md:text-center">{title}</p>
            <div>
              <Icon IconName={MdEdit} />
              <Icon IconName={MdDelete} />
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
