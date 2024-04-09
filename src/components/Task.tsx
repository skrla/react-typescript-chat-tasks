import React, { forwardRef, useState } from "react";
import Icon from "./Icon";
import { MdDelete, MdEdit } from "react-icons/md";
import { TaskType } from "../types";

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

    return (
      <div
        ref={ref}
        className="bg-white p-2 mb-2 rounded-md drop-shadow-sm hover:drop-shadow-md"
      >
        <div>
          {editMode ? (
            <input
              className="border-2 px-2 border-myBlue rounded-sm mb-1"
              placeholder="Task title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          ) : (
            <p className="cursor-pointer">{title}</p>
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
                  className="w-full px-3 border-2 border-myBlue rounded-md mt-2"
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              ) : (
                <p className="p-2 text-justify">{description}</p>
              )}
              <div className="flex justify-end">
                <Icon IconName={MdEdit} />
                <Icon IconName={MdDelete} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Task;
