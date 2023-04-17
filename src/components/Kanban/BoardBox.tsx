import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { combineClassNames } from "@/utils/combineClassNames";
import { Task } from "@/store/tasks";
import { useSubmit } from "react-router-dom";

interface BoardBoxProps {
  data: Task;
  placeholder?: ReactNode;
}

export const BoardBox = (props: BoardBoxProps) => {
  const colorVariants = {
    red: "bg-red-100 text-red-500",
    yellow: "bg-yellow-100 text-yellow-500",
    lime: "bg-lime-100 text-lime-500",
    green: "bg-green-100 text-green-500",
    blue: "bg-blue-100 text-blue-500",
    emerald: "bg-emerald-100 text-emerald-500",
    orange: "bg-orange-100 text-orange-500",
    amber: "bg-amber-100 text-amber-500",
    teal: "bg-teal-100 text-teal-500",
    cyan: "bg-cyan-100 text-cyan-500",
    indigo: "bg-indigo-100 text-indigo-500",
    violet: "bg-violet-100 text-violet-500",
    fuchsia: "bg-fuchsia-100 text-fuchsia-500",
    purple: "bg-purple-100 text-purple-500",
    rose: "bg-rose-100 text-rose-500",
    pink: "bg-pink-100 text-pink-500",
  };

  const { tag, tagColors, id, name, createdAt, description, file, fileName } =
    props.data;

  const submit = useSubmit();

  const handleDelete = () => {
    const formData = new FormData();
    formData.set("id", id.toString());
    formData.set("type", "task");
    submit(formData, { method: "DELETE" });
  };

  const handleDownload = async () => {
    const fileData = file!.split(";base64,");

    const ubuffer = Uint8Array.from(atob(fileData[1]), (c) => c.charCodeAt(0));

    const sBase64 = fileData[1];
    const arrayBuffer = new Uint8Array(
      [...window.atob(sBase64)].map((char) => char.charCodeAt(0))
    );
    const fileLink = document.createElement("a");

    fileLink.href = window.URL.createObjectURL(new Blob([arrayBuffer]));
    fileLink.setAttribute("download", fileName!);
    document.body.appendChild(fileLink);
    fileLink.click();
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="absolute top-0 right-0 flex items-center justify-center hidden w-6 h-6 mt-3 mr-2 group-hover:flex"
      >
        <XMarkIcon
          className={combineClassNames("rounded-lg", colorVariants[tagColors])}
        />
      </button>
      <span
        className={combineClassNames(
          "flex items-center h-6 px-3 text-xs font-semibold rounded-full",
          colorVariants[tagColors]
        )}
      >
        {tag}
      </span>
      <h4 className="mt-3 text-sm font-medium">{name}</h4>
      {description && (
        <p className="mt-3 text-sm border-t w-full py-2">{description}</p>
      )}
      <div className="flex justify-center items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center flex-1">
          <svg
            className="w-4 h-4 text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 leading-none">{createdAt}</span>
        </div>
        {/*{file && (*/}

        {/*)}*/}
      </div>
      {file && (
        <div className="flex mt-2 justify-end w-full">
          <button
            className={combineClassNames(
              colorVariants[tagColors],
              "rounded-lg p-2"
            )}
            onClick={handleDownload}
            type="button"
          >
            Download a file
          </button>
        </div>
      )}
    </>
  );
};
