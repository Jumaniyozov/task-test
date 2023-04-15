import {Fragment, useEffect, useRef, useState} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { combineClassNames } from "@/utils/combineClassNames";
import { useCalendarStore } from "@/store/calendar";
import { EventModal } from "./EventModal";
import { toast, ToastContainer } from "react-toastify";
import { renderCalendar } from "@/utils/createDays";
import { format } from "date-fns";
import { useEventStore } from "@/store/events";

export const MonthView = () => {
  const date = useRef(new Date());
  const [currYear, setCurrYear] = useState(date.current.getFullYear());
  const [currMonth, setCurrMonth] = useState(date.current.getMonth());

  const days = renderCalendar(currYear, currMonth, date.current);

  const { openModal, closeModal, isSuccess, setIsSuccess, error, setError } =
    useCalendarStore();

  const { events } = useEventStore();

  const handleToday = () => {
    setCurrMonth(date.current.getMonth());
    setCurrYear(date.current.getFullYear());
  };

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
      closeModal();
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

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <EventModal />
      <header className="flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <div>
            {format(new Date(currYear, currMonth), "MMMM")}{" "}
            {format(new Date(currYear, currMonth), "yyyy")}
          </div>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={() => setCurrMonth((prev) => prev - 1)}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
              onClick={handleToday}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
              onClick={() => setCurrMonth((prev) => prev + 1)}
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.key}
                className={combineClassNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative py-2 px-3 cursor-pointer "
                )}
                onClick={() => openModal(day.date, day.compare)}
              >
                <div
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : ""
                  }
                >
                  {day.day}
                </div>
                {events.length > 0 && (
                  <ol className="mt-2">
                    {events.map((event) => (
                      <Fragment key={event.id}>
                        {event.compareStart === day.compare && (
                          <li key={event.id} className="hidden first:flex">
                            <div className="group flex">
                              <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                {event.name}
                              </p>
                            </div>
                          </li>
                        )}
                      </Fragment>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
// {events.length > 0 && (
//     <ol className="mt-2" >
//         {events.slice(0, 2).map((event) => (
//             <li key={event.id}>
//                 <a href={event.href} className="group flex">
//                     <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
//                         {event.name}
//                     </p>
//                     <time
//                         dateTime={event.datetime}
//                         className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
//                     >
//                         {event.time}
//                     </time>
//                 </a>
//             </li>
//         ))}
//         {day.events.length > 2 && (
//             <li className="text-gray-500">
//                 + {day.events.length - 2} more
//             </li>
//         )}
//     </ol>
// )}
