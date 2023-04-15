import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CalendarState {
  currDate: number | null;
  currEvtHash: string;
  isModalOpen: boolean;
  isSuccess: boolean;
  closeModal: () => void;
  openModal: (val: number, hash: string) => void;
  setIsSuccess: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
}

export const useCalendarStore = create<CalendarState>()(
  devtools(
    persist(
      (set) => ({
        isModalOpen: false,
        isSuccess: false,
        error: null,
        currDate: null,
        currEvtHash: "",
        closeModal: () => set((state) => ({ ...state, isModalOpen: false })),
        openModal: (val, hash) =>
          set((state) => ({
            ...state,
            isModalOpen: true,
            currDate: val,
            currEvtHash: hash,
          })),
        setIsSuccess: (val) => set((state) => ({ ...state, isSuccess: val })),
        setError: (val) => set((state) => ({ ...state, error: val })),
      }),
      {
        name: "calendar-storage",
      }
    )
  )
);
