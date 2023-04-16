import { createBoards } from "@/utils/canban/createBoards";
import { BoardHeader } from "@/components/Kanban/BoardHeader";
import { BoardBox } from "@/components/Kanban/BoardBox";

const boards = createBoards();

export const Kanban = () => {
  return (
    <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-full">
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto h-full">
        {boards.map((board) => (
          <div className="flex flex-col flex-shrink-0 w-72" key={board.id}>
            <BoardHeader header={board.header} length={board.data.length} />

            <ul className="flex flex-col pb-2 overflow-auto">
              {board.data.map((element) => (
                <BoardBox
                  date={element.date}
                  title={element.title}
                  tagColors={element.tagColors}
                  tag={element.tag}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
