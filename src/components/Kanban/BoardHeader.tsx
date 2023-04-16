import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Board } from "@/store/boards";
import { useSubmit } from "react-router-dom";
import { useTaskModalStore } from "@/store/tasks";

interface BoardHeaderProps {
  data: Board;
}

export const BoardHeader = ({ data }: BoardHeaderProps) => {
  const submit = useSubmit();
  const openTaskModal = useTaskModalStore((state) => state.openModal);

  const handleDelete = () => {
    const formData = new FormData();
    formData.set("id", data.id.toString());
    formData.set("type", "board");
    submit(formData, { method: "DELETE" });
  };

  const handleCreateTask = () => {
    openTaskModal(data);
  };

  return (
    <>
      <div className="flex items-center flex-shrink-0 h-10 px-2 bg-white rounded-lg shadow-md">
        <span className="block text-sm font-semibold">{data.name}</span>
        {/*{length && length > 0 && (*/}
        {/*  <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">*/}
        {/*    {length}*/}
        {/*  </span>*/}
        {/*)}*/}
        <button
          onClick={handleDelete}
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
        >
          <XMarkIcon />
        </button>
      </div>
      <button
        onClick={handleCreateTask}
        className="mt-2 flex items-center justify-center border-dashed border-2 p-2 border-blue-500 rounded-lg hover:border-none hover:bg-indigo-500 hover:text-indigo-100"
      >
        Add a task to {data.name}
      </button>
    </>
  );
};
