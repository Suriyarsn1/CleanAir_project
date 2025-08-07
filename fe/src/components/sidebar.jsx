import React from "react";
import {
  FaImage,
  FaUserMd,
  FaHospitalAlt,
  FaUsers,
  FaBars,
} from "react-icons/fa";

const menuItems = [
  { id: "images", label: "Manage Website Images", icon: <FaImage size={20} /> },
  { id: "doctors", label: "Manage Doctor List", icon: <FaUserMd size={20} /> },
  {
    id: "healthcare",
    label: "Manage Health Care List",
    icon: <FaHospitalAlt size={20} />,
  },
  { id: "users", label: "Manage User Lists", icon: <FaUsers size={20} /> },
];

export default function Sidebar({
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Overlay for small screen when sidebar open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 flex flex-col transition-all duration-300
         ${
           sidebarOpen
             ? "w-64 translate-x-0"
             : "-translate-x-full lg:translate-x-0 lg:w-16"
         }
         lg:static lg:translate-x-0 lg:w-16
        `}
        aria-label="Sidebar navigation"
      >
        {/* Header with Title and Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-sky-200">
          <h1
            className={`text-xl font-bold text-sky-700 transition-opacity duration-300 whitespace-nowrap overflow-hidden ${
              sidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
            }`}
          >
            Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sky-700 focus:outline-none hover:text-sky-500 p-2 rounded lg:hidden"
            aria-label="Toggle Sidebar"
            aria-expanded={sidebarOpen}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-grow mt-4 overflow-y-auto">
          {menuItems.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => {
                setActive(id);
                // Optionally close sidebar on small screens when selecting menu item
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg font-medium focus:outline-none transition
              ${
                active === id
                  ? "bg-sky-600 text-white shadow-lg"
                  : "text-sky-700 hover:bg-sky-200 hover:text-sky-900"
              }
              `}
              aria-current={active === id ? "page" : undefined}
              aria-label={label}
            >
              <span className="flex-shrink-0">{icon}</span>
              <span
                className={`transition-opacity duration-300 select-none overflow-hidden whitespace-nowrap ${
                  sidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className={`mt-auto p-4 text-xs text-sky-400 text-center select-none whitespace-nowrap overflow-hidden
          transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
          }`}
        >
          &copy; {new Date().getFullYear()} Your Company
        </div>
      </aside>
    </>
  );
}
