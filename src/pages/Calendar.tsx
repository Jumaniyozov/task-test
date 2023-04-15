import { ActionFunctionArgs } from "react-router-dom";
import { format, parseISO, addHours, addMinutes } from "date-fns";
import { MonthView } from "@/components/Calendar/MonthView";
import { useCalendarStore } from "@/store/calendar";
import { useEventStore } from "@/store/events";

const baseURL = import.meta.env.VITE_API_URL;

export const CalendarActions = async ({ request }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const objData = Object.fromEntries(formData);
      let data = {} as any;

      for (const val in objData) {
        data[val] = objData[val];
      }

      const endDate = new Date(data["end-date"]);
      const currDate = useCalendarStore.getState().currDate!;

      const [hours, minutes] = data["start-time"].split(":");
      let startDate = addMinutes(addHours(new Date(currDate!), hours), minutes);

      if (endDate.getTime() < startDate.getTime()) {
        useCalendarStore
          .getState()
          .setError("End date must be bigger than current date");
        return { ok: false };
      }

      data["end-date"] = format(
        parseISO(data["end-date"]),
        "MM/dd/yyyy HH:mm:ss"
      );

      data["start-date"] = format(startDate, "MM/dd/yyyy HH:mm:ss");
      data["compareStart"] = format(startDate, "MM/dd/yyyy");
      data["compareEnd"] = format(endDate, "MM/dd/yyyy");

      const res = await fetch(`${baseURL}/events`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      useCalendarStore.getState().setIsSuccess(true);

      return { ok: true };
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
    <div className="px-4 pb-4 h-full">
      <MonthView />
    </div>
  );
};
