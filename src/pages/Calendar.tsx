import { ActionFunctionArgs } from "react-router-dom";
import { MonthView } from "@/components/Calendar/MonthView";
import { useEventStore } from "@/store/events";
import { calendarHandler } from "@/utils/calendar/handler";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_PROD_URL : import.meta.env.VITE_API_URL;

export const CalendarActions = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      return await calendarHandler.post(request);
    }

    case "DELETE": {
      return await calendarHandler.delete(request);
    }
  }
};

export const CalendarLoader = async () => {
  const res = await fetch(`${baseURL}/events`);
  const data = await res.json();
  useEventStore.getState().setEvents(data);
  return data;
};

export const Calendar = () => {
  return (
    <div className="px-4 pb-4 h-screen bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <MonthView />
    </div>
  );
};
