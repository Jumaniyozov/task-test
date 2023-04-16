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
  eventError: string | null;
  eventActionSuccess: boolean;
  setEventError: (val: string | null) => void;
  setActionSuccess: (val: boolean) => void;
}

export const useEventStore = create<EventState>()(
  devtools(
    persist(
      (set) => ({
        events: [],
        eventError: null,
        eventActionSuccess: false,
        setEvents: (events) => set((state) => ({ ...state, events })),
        setEventError: (msg) => set((state) => ({ ...state, eventError: msg })),
        setActionSuccess: (val) =>
          set((state) => ({ ...state, eventActionSuccess: val })),
      }),
      {
        name: "events-storage",
      }
    )
  )
);
