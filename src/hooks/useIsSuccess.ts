import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCalendarStore } from "@/store/calendar";

export const useIsSuccess = (noClose = false) => {
  const { closeModal, isSuccess, setIsSuccess, error, setError } =
    useCalendarStore();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError(null);
    }

    if (isSuccess && !error) {
      !noClose && closeModal();
      toast.success("Event successfully added", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsSuccess(false);
    }
  }, [isSuccess, error]);
};
