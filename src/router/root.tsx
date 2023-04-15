import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {RootLayout} from "../pages/RootLayout";
import {Canban} from "../pages/Canban";
import {Calendar} from "../pages/Calendar";

export const root = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route path="/canban" element={<Canban/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
        </Route>
    )
);

