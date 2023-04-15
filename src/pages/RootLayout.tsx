import {Sidebar} from "../components/Sidebar";
import {Outlet} from "react-router-dom";

export const RootLayout = () => {
    return (
        <div className="w-full h-screen flex">
            <div className="w-1/5 h-full">
                <Sidebar/>
            </div>
            <Outlet/>
        </div>
    )
}
