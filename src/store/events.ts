import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface EventType {
  name: string;
  "end-date": string;
  description: string;
  "start-date": string;
  compareStart: string;
  compareEnd: string;
  id: number;
}

interface EventState {
  events: EventType[];
  setEvents: (events: EventType[]) => void;
}

export const useEventStore = create<EventState>()(
  devtools(
    persist(
      (set) => ({
        events: [],
        setEvents: (events) => set((state) => ({ ...state, events })),
      }),
      {
        name: "events-storage",
      }
    )
  )
);
