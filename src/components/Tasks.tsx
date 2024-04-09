import React from "react";
import Task from "./Task";
import { TaskType } from "../types";
import FlipMove from "react-flip-move";

type TasksType = {
  tasks: TaskType[];
  listId: string;
};

function Tasks({ tasks, listId }: TasksType) {
  return (
    <div className="p-3">
      <FlipMove>
        {tasks.map((e) => (
          <Task key={e.id} task={e} listId={listId} />
        ))}
      </FlipMove>
      {tasks.length === 0 && <p className="text-center">No task added yet!</p>}
    </div>
  );
}

export default Tasks;
