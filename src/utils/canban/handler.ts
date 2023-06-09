import { useBoardStore } from "@/store/boards";
import { useTaskStore } from "@/store/tasks";

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_URL;

const postBoardHandler = async (request: Request) => {
  const data = Object.fromEntries(await request.formData());
  const type = data["type"];
  if (type === "board") {
    const res = await fetch(`${baseURL}/boards`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      useBoardStore.getState().setBoardActionError(res.statusText);
      useBoardStore.getState().setBoardActionSuccess(false);
      return { ok: false };
    }

    useBoardStore.getState().setBoardActionSuccess(true);
    useBoardStore
      .getState()
      .setBoardActionSuccessMessage("Board successfully created");

    return { ok: true };
  } else if (type === "task") {
    const res = await fetch(`${baseURL}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      useTaskStore.getState().setTaskActionError(res.statusText);
      useTaskStore.getState().setTaskActionSuccess(false);
      return { ok: false };
    }

    useTaskStore.getState().setTaskActionSuccess(true);
    useTaskStore
      .getState()
      .setTaskActionSuccessMessage("Task successfully added");

    return { ok: true };
  }
};

const deleteBoardHandler = async (request: Request) => {
  const data = Object.fromEntries(await request.formData());
  const type = data["type"];

  if (type === "board") {
    const id = data["id"];

    const res = await fetch(`${baseURL}/boards/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      useBoardStore.getState().setBoardActionError(res.statusText);
      useBoardStore.getState().setBoardActionSuccess(false);
      return { ok: false };
    }

    useBoardStore.getState().setBoardActionSuccess(true);
    useBoardStore
      .getState()
      .setBoardActionSuccessMessage("Board successfully deleted");

    return { ok: true };
  } else if (type === "task") {
    const id = data["id"];

    const res = await fetch(`${baseURL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      useTaskStore.getState().setTaskActionError(res.statusText);
      useTaskStore.getState().setTaskActionSuccess(false);
      return { ok: false };
    }

    useTaskStore.getState().setTaskActionSuccess(true);
    useTaskStore
      .getState()
      .setTaskActionSuccessMessage("Task successfully deleted");

    return { ok: true };
  }
};

const patchBoardHandler = async (request: Request) => {
  const data = await request.formData();
  const boardId = data.get("boardId");
  const id = data.get("id");
  const taskData = data.get("data");
  let jsonData = {};
  if (typeof taskData === "string") {
    jsonData = JSON.parse(taskData);
  }

  const res = await fetch(`${baseURL}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...jsonData,
      boardId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  return { ok: true };
};

export const canbanHandler = {
  postBoard: postBoardHandler,
  deleteBoard: deleteBoardHandler,
  patchBoard: patchBoardHandler,
};
