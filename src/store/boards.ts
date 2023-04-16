import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Board {
  name: string;
  createdAt: string;
  id: number;
}

export interface BoardState {
  boards: Board[];
  boardActionError: string | null;
  boardActionSuccess: boolean | null;
  boardActionSuccessMessage: string | null;
  setBoards: (boards: Board[]) => void;
  setBoardActionError: (val: string | null) => void;
  setBoardActionSuccess: (val: boolean | null) => void;
  setBoardActionSuccessMessage: (val: string | null) => void;
}

export const useBoardStore = create<BoardState>()(
  devtools(
    persist(
      (set) => ({
        boards: [],
        boardActionError: null,
        boardActionSuccess: null,
        boardActionSuccessMessage: null,
        setBoards: (boards) => set((state) => ({ ...state, boards })),
        setBoardActionSuccessMessage: (message) =>
          set((state) => ({
            ...state,
            boardActionSuccessMessage: message,
          })),
        setBoardActionError: (val) =>
          set((state) => ({ ...state, boardActionError: val })),
        setBoardActionSuccess: (val) =>
          set((state) => ({ ...state, boardActionSuccess: val })),
      }),
      {
        name: "boards-storage",
      }
    )
  )
);

export interface BoardModalState {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

export const useBoardModalStore = create<BoardModalState>()(
  persist(
    (set) => ({
      isModalOpen: false,
      closeModal: () => set((state) => ({ ...state, isModalOpen: false })),
      openModal: () => set((state) => ({ ...state, isModalOpen: true })),
    }),
    {
      name: "boards-modal-storage",
    }
  )
);
