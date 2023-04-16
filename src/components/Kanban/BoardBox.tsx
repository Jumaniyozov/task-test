import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { combineClassNames } from "@/utils/combineClassNames";

interface BoardBoxProps {
  tagColors: string;
  tag: string;
  title: string;
  date: string;
}

export const BoardBox = (props: BoardBoxProps) => {
  const { tagColors, tag, title, date } = props;
  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <div
      className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
      draggable="true"
    >
      <button
        onClick={handleDelete}
        className="absolute top-0 right-0 flex items-center justify-center hidden w-6 h-6 mt-3 mr-2 group-hover:flex"
      >
        <XMarkIcon
          className={combineClassNames("rounded-lg", tagColors)}
        />
      </button>
      <span
        className={combineClassNames(
          "flex items-center h-6 px-3 text-xs font-semibold rounded-full",
          tagColors
        )}
      >
        {tag}
      </span>
      <h4 className="mt-3 text-sm font-medium">{title}</h4>
      <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
        <div className="flex items-center">
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
          <span className="ml-1 leading-none">{date}</span>
        </div>
        {/*<div className="relative flex items-center ml-4">*/}
        {/*  <svg*/}
        {/*    className="relative w-4 h-4 text-gray-300 fill-current"*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*    viewBox="0 0 20 20"*/}
        {/*    fill="currentColor"*/}
        {/*  >*/}
        {/*    <path*/}
        {/*      fillRule="evenodd"*/}
        {/*      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"*/}
        {/*      clipRule="evenodd"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*  <span className="ml-1 leading-none">{element.comments}</span>*/}
        {/*</div>*/}
        {/*<div className="flex items-center ml-4">*/}
        {/*  <svg*/}
        {/*    className="w-4 h-4 text-gray-300 fill-current"*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*    viewBox="0 0 20 20"*/}
        {/*    fill="currentColor"*/}
        {/*  >*/}
        {/*    <path*/}
        {/*      fillRule="evenodd"*/}
        {/*      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"*/}
        {/*      clipRule="evenodd"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*  <span className="ml-1 leading-none">{element.attached}</span>*/}
        {/*</div>*/}
        {/*<img*/}
        {/*  className="w-6 h-6 ml-auto rounded-full"*/}
        {/*  src={element.imgUrl}*/}
        {/*  alt="user avatar"*/}
        {/*/>*/}
      </div>
    </div>
  );
};
