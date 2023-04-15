import { Sidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="w-full flex">
      <div className="w-1/5 h-screen">
        <Sidebar />
      </div>
      <div className="h-screen w-4/5">
        <Outlet />
      </div>
    </div>
  );
};
