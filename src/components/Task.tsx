import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit, MdSave } from "react-icons/md";
import { TaskType } from "../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { collapseTask, editTaskSwitch } from "../redux/taskListSlice";
import { BE_deleteTask, BE_saveTask } from "../backend/taskQueries";

type TaskTypeProps = {
  task: TaskType;
  listId: string;
};

const Task = forwardRef(
  (
    { task, listId }: TaskTypeProps,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ) => {
    const { id, title, description, editMode, collapsed } = task;
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = () => {
      const taskData: TaskType = {
        id,
        title: editTitle,
        description: editDescription,
      };
      BE_saveTask(listId, taskData, dispatch, setLoading);
    };

    const handleEditMode = () => {
      dispatch(editTaskSwitch({ listId, taskId: id }));
    };

    const handleOnClick = () => {
      editMode ? handleSave() : handleEditMode();
    };

    const handleDelete = () => {
      if (id) BE_deleteTask(listId, id, dispatch, setLoading);
    };

    return (
      <div
        ref={ref}
        className="bg-darkGreen text-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md"
      >
        <div>
          {editMode ? (
            <input
              className="border-2 px-2 border-white rounded-sm mb-1 bg-darkGreen focus:bg-richBlack active:bg-richBlack hover:bg-richBlack"
              placeholder="Task title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          ) : (
            <p
              onClick={() => dispatch(collapseTask({ listId, taskId: id }))}
              className="cursor-pointer"
            >
              {title}
            </p>
          )}
        </div>
        {!collapsed && (
          <div>
            <hr />
            <div>
              {editMode ? (
                <textarea
                  value={editDescription}
                  placeholder="Add some description"
                  className="w-full px-3 border-2 border-white rounded-md mt-2 bg-darkGreen focus:bg-richBlack active:bg-richBlack hover:bg-richBlack"
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              ) : (
                <p className="p-2 text-justify">{description}</p>
              )}
              <div className="flex justify-end">
                <Icon
                  IconName={editMode ? MdSave : MdEdit}
                  onClick={handleOnClick}
                  loading={editMode && loading}
                  size={16}
                />
                <Icon
                  IconName={MdDelete}
                  loading={loading}
                  onClick={handleDelete}
                  size={16}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Task;
