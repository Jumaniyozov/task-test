import { useEffect } from "react";
import { toast } from "react-toastify";
import { useEventStore } from "@/store/events";

export const useEventIsSuccess = () => {
  const {
    events,
    eventError,
    eventActionSuccess,
    setEventError,
    setActionSuccess,
  } = useEventStore();

  useEffect(() => {
    if (eventError) {
      toast.error(eventError, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEventError(null);
    }

    if (eventActionSuccess && !eventError) {
      toast.success("Event successfully deleted", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setActionSuccess(false);
    }
  }, [eventActionSuccess, eventError]);
};

