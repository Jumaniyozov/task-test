import { Sidebar } from "@/components/Sidebar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="w-full flex">
      <div className="w-1/5 h-screen">
        <Sidebar />
        {location.pathname === "/" && (
          <Navigate to="/calendar" replace={true} />
        )}
      </div>
      <div className="h-screen w-4/5">
        <Outlet />
      </div>
    </div>
  );
};
