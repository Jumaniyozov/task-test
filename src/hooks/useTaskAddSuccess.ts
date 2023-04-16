import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTaskModalStore, useTaskStore } from "@/store/tasks";

export const useTaskSuccess = () => {
  const {
    taskActionError,
    taskActionSuccessMessage,
    taskActionSuccess,
    setTaskActionSuccessMessage,
    setTaskActionSuccess,
    setTaskActionError,
  } = useTaskStore();

  const { closeModal } = useTaskModalStore();

  useEffect(() => {
    if (taskActionError) {
      toast.error(taskActionError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTaskActionError(null);
    }

    if (taskActionSuccess && !taskActionError) {
      toast.success(taskActionSuccessMessage, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTaskActionSuccess(false);
      setTaskActionSuccessMessage(null);
      closeModal();
    }
  }, [taskActionSuccess, taskActionError]);
};
