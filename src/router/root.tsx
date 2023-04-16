import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout } from "@/pages/RootLayout";
import { Kanban, KanbanActions, KanbanLoader } from "@/pages/Kanban";
import { Calendar, CalendarActions, CalendarLoader } from "@/pages/Calendar";
import { GlobalErrorPage } from "@/pages/Error";

export const root = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<GlobalErrorPage />}>
      <Route
        path="/canban"
        element={<Kanban />}
        action={KanbanActions}
        loader={KanbanLoader}
      />
      <Route
        path="/calendar"
        element={<Calendar />}
        action={CalendarActions}
        loader={CalendarLoader}
      />
    </Route>
  )
);
