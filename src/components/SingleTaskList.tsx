import React, { forwardRef, useEffect, useState } from "react";
import Icon from "./Icon";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowUp,
  MdSave,
} from "react-icons/md";
import Tasks from "./Tasks";
import { TaskListType } from "../types";
import {
  BE_addTask,
  BE_deleteTaskList,
  BE_getTasks,
  BE_saveTaskList,
} from "../backend/taskQueries";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { collapseAllTasks, editTaskListSwitch } from "../redux/taskListSlice";
import { TaskListLoader } from "./Loaders";

type SingleTaskListType = {
  singleTaskList: TaskListType;
};

const SingleTaskList = forwardRef(
  (
    { singleTaskList }: SingleTaskListType,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, editMode, tasks = [], title } = singleTaskList;
    const [editTitle, setEditTitle] = useState(title);
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

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

    const handleAddTask = () => {
      if (id) BE_addTask(id, dispatch, setLoading);
    };

    const handleCollapse = () => {
      if (collapsed) {
        return dispatch(collapseAllTasks({ listId: id, value: false }));
      }
      return dispatch(collapseAllTasks({ listId: id }));
    };

    useEffect(() => {
      if (id) BE_getTasks(id, dispatch, setTasksLoading);
    }, [id, dispatch]);

    useEffect(() => {
      const checkCollapsed = () => {
        tasks?.forEach((task) => {
          if (!task.collapsed) {
            return setCollapsed(false);
          }
          setCollapsed(true);
        });
      };
      checkCollapsed();
    }, [tasks]);

    return (
      <div ref={ref} className="relative">
        <div className="bg-[#d3f0f9] w-full md:w-[400px] drop-shadow-md rounded-md min-h-40 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center md:gap-10 bg-gradient-to-tr from-customGreen to-eggPlant bg-opacity-70 p-3 text-white text-center">
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
              <Icon
                onClick={handleCollapse}
                IconName={MdKeyboardArrowUp}
                className={`${collapsed && "rotate-180"}`}
              />
            </div>
          </div>
          {tasksLoading ? (
            <TaskListLoader />
          ) : (
            id && <Tasks tasks={tasks || []} listId={id} />
          )}
        </div>
        <Icon
          IconName={MdAdd}
          onClick={handleAddTask}
          reduceOpacityOnHover
          loading={loading}
          className="absolute -top-3 -left-5 drop-shadow-lg"
        />
      </div>
    );
  }
);

export default SingleTaskList;
