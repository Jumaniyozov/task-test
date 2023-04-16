import { CalendarDaysIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { combineClassNames } from "@/utils/combineClassNames";

const navigation = [
  { name: "Kanban", href: "/canban", icon: ViewColumnsIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarDaysIcon },
];

export const Sidebar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState("Kanban");

  useEffect(() => {
    switch (location.pathname) {
      case "/canban": {
        setCurrent("Kanban");
        return;
      }
      case "/calendar": {
        setCurrent("Calendar");
        return;
      }
    }
  }, [location]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-indigo-700 h-full">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <h3 className="text-white text-2xl flex justify-center w-full">
            Task
          </h3>
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2" aria-label="Sidebar">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={combineClassNames(
                current === item.name
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
              onClick={() => setCurrent(item.name)}
            >
              <item.icon
                className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
                aria-hidden="true"
              />
              <span className="flex-1">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
