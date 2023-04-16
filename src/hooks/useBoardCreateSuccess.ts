import { useEffect } from "react";
import { toast } from "react-toastify";
import { useBoardModalStore, useBoardStore } from "@/store/boards";

export const useBoardCreateSuccess = () => {
  const {
    boardActionError,
    boardActionSuccess,
    setBoardActionSuccessMessage,
    boardActionSuccessMessage,
    setBoardActionSuccess,
    setBoardActionError,
  } = useBoardStore();

  const { closeModal } = useBoardModalStore();

  useEffect(() => {
    if (boardActionError) {
      toast.error(boardActionError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setBoardActionError(null);
    }

    if (boardActionSuccess && !boardActionError) {
      toast.success(boardActionSuccessMessage, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setBoardActionSuccess(false);
      setBoardActionSuccessMessage(null);
      closeModal();
    }
  }, [boardActionSuccess, boardActionError]);
};
