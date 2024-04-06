import React from "react";
import SingleTaskList from "../components/SingleTaskList";

function ListPage() {
  return (
    <div className="p-10">
      <div className="flex flex-wrap justify-center gap-10">
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
        <SingleTaskList />
      </div>
    </div>
  );
}

export default ListPage;
