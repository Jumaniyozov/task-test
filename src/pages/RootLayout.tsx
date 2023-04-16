import { Sidebar } from "@/components/Sidebar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="w-full flex">
      <div className="w-2/12">
        <Sidebar />
        {location.pathname === "/" && (
          <Navigate to="/calendar" replace={true} />
        )}
      </div>
      <div className="w-10/12 h-screen">
        <Outlet />
      </div>
    </div>
  );
};
