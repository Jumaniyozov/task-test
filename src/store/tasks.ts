import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {Board} from "@/store/boards";

type colorVariants =
    "red" |
    "yellow" |
    "lime" |
    "green" |
    "blue" |
    "emerald" |
    "orange" |
    "amber" |
    "teal" |
    "cyan" |
    "indigo" |
    "violet" |
    "fuchsia" |
    "purple" |
    "rose" |
    "pink";


export interface Task {
    name: string;
    createdAt: string;
    boardId: number;
    tag: string;
    tagColors: colorVariants;
    id: number;
}

export interface TaskState {
    tasks: Task[];
    taskActionError: string | null;
    taskActionSuccess: boolean | null;
    taskActionSuccessMessage: string | null;
    setTasks: (tasks: Task[]) => void;
    setTaskActionError: (val: string | null) => void;
    setTaskActionSuccess: (val: boolean | null) => void;
    setTaskActionSuccessMessage: (val: string | null) => void;
}

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            (set) => ({
                tasks: [],
                taskActionError: null,
                taskActionSuccess: null,
                taskActionSuccessMessage: null,
                setTasks: (tasks) => set((state) => ({...state, tasks})),
                setTaskActionError: (message) =>
                    set((state) => ({
                        ...state,
                        taskActionError: message,
                    })),
                setTaskActionSuccess: (val) =>
                    set((state) => ({...state, taskActionSuccess: val})),
                setTaskActionSuccessMessage: (val) =>
                    set((state) => ({...state, taskActionSuccessMessage: val})),
            }),
            {
                name: "tasks-storage",
            }
        )
    )
);

export interface TaskModalState {
    isModalOpen: boolean;
    closeModal: () => void;
    isLoading: boolean;
    currentBoard: Board | null;
    openModal: (board: Board | null) => void;
    setIsLoading: (val: boolean) => void;
}

export const useTaskModalStore = create<TaskModalState>()(
    persist(
        (set) => ({
            isModalOpen: false,
            currentBoard: null,
            isLoading: false,
            setIsLoading: (val) => set((state) => ({...state, isLoading: val})),
            closeModal: () => set((state) => ({...state, isModalOpen: false})),
            openModal: (board) =>
                set((state) => ({...state, isModalOpen: true, currentBoard: board})),
        }),
        {
            name: "tasks-modal-storage",
        }
    )
);
