import { useCalendarStore } from "@/store/calendar";
import { addHours, addMinutes, format, parseISO } from "date-fns";
import { DATE_FORMAT } from "@/utils/DateFormat";
import { useEventStore } from "@/store/events";

const baseURL = import.meta.env.VITE_API_URL;

const postHandler = async (request: Request) => {
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
    DATE_FORMAT.daysWithTime
  );

  data["start-date"] = format(startDate, DATE_FORMAT.daysWithTime);
  data["compareStart"] = format(startDate, DATE_FORMAT.days);
  data["compareEnd"] = format(endDate, DATE_FORMAT.days);

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
};

const deleteHandler = async (request: Request) => {
  const formData = await request.formData();
  const id = formData.get("id");

  const res = await fetch(`${baseURL}/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    useEventStore.getState().setEventError(res.statusText);
    return { ok: false };
  }

  useEventStore.getState().setActionSuccess(true);

  return { ok: true };
};

export const calendarHandler = {
  post: postHandler,
  delete: deleteHandler,
};
