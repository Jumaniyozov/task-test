import { BoardHeader } from "@/components/Kanban/BoardHeader";
import React, { Fragment } from "react";
import { ActionFunctionArgs } from "react-router-dom";
import { useBoardModalStore, useBoardStore } from "@/store/boards";
import { BoardModal } from "@/components/Kanban/BoardModal";
import { useBoardCreateSuccess } from "@/hooks/useBoardCreateSuccess";
import { ToastContainer } from "react-toastify";
import { canbanHandler } from "@/utils/canban/handler";
import { useTaskStore } from "@/store/tasks";
import { BoardBox } from "@/components/Kanban/BoardBox";
import { TaskModal } from "@/components/Kanban/TaskModal";
import { useTaskSuccess } from "@/hooks/useTaskAddSuccess";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "@/components/StrictModeDroppable";

const baseURL = import.meta.env.VITE_API_URL;
export const KanbanActions = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      return canbanHandler.postBoard(request);
    }

    case "DELETE": {
      return canbanHandler.deleteBoard(request);
    }
  }
};

export const KanbanLoader = async () => {
  const fetchBoards = fetch(`${baseURL}/boards`).then((res) => res.json());
  const fetchTasks = fetch(`${baseURL}/tasks`).then((res) => res.json());
  const res = await Promise.all([fetchTasks, fetchBoards]);

  useBoardStore.getState().setBoards(res[1]);
  useTaskStore.getState().setTasks(res[0]);

  return res;
};

export const Kanban = () => {
  useBoardCreateSuccess();
  useTaskSuccess();
  const boards = useBoardStore((state) => state.boards);
  const openBoardModal = useBoardModalStore((state) => state.openModal);

  const tasks = useTaskStore((state) => state.tasks);

  const handleBoardCreate = () => {
    openBoardModal();
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
  };

  return (
    <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-full">
      <BoardModal />
      <ToastContainer />
      <TaskModal />
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto h-full p-2">
        <DragDropContext onDragEnd={onDragEnd}>
          {boards.map((board) => (
            <div className="flex flex-col flex-shrink-0 w-72" key={board.id}>
              <BoardHeader data={board} />

              <StrictModeDroppable droppableId={board.id.toString()}>
                {(droppableProvided, droppableSnapshot) => (
                  <div
                    className="flex flex-col pb-2 h-full"
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                  >
                    {tasks.map((task, index) => (
                      <Fragment key={task.id}>
                        {task.boardId.toString() === board.id.toString() && (
                          <Draggable
                            key={task.id.toString()}
                            draggableId={task.id.toString()}
                            index={index}
                          >
                            {(draggableProvided, draggableSnapshot) => (
                              <>
                                <div
                                  key={task.id.toString()}
                                  className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                >
                                  <BoardBox data={task} />
                                </div>
                              </>
                            )}
                          </Draggable>
                        )}
                      </Fragment>
                    ))}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </StrictModeDroppable>
            </div>
          ))}
        </DragDropContext>

        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <button
              onClick={handleBoardCreate}
              className="flex items-center justify-center border-dashed border-2 p-2 border-blue-500 rounded-lg hover:border-none hover:bg-indigo-500 hover:text-indigo-100"
            >
              Add a new board +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// return (
//     <div className="flex flex-col text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 h-full">
//         <BoardModal />
//         <ToastContainer />
//         <TaskModal />
//         <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto h-full p-2">
//             {boards.map((board) => (
//                 <div className="flex flex-col flex-shrink-0 w-72" key={board.id}>
//                     <BoardHeader data={board} />
//
//                     <div className="flex flex-col pb-2 overflow-auto">
//                         {tasks.map((task) => (
//                             <Fragment key={task.id}>
//                                 {task.boardId.toString() === board.id.toString() && (
//                                     <BoardBox key={task.id} data={task} />
//                                 )}
//                             </Fragment>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//             <div className="flex flex-col flex-shrink-0 w-72">
//                 <div className="flex items-center flex-shrink-0 h-10 px-2">
//                     <button
//                         onClick={handleBoardCreate}
//                         className="flex items-center justify-center border-dashed border-2 p-2 border-blue-500 rounded-lg hover:border-none hover:bg-indigo-500 hover:text-indigo-100"
//                     >
//                         Add a new board +
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// );