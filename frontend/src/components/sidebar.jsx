import {
  FaImage,
  FaUserMd,
  FaHospitalAlt,
  FaUsers,
} from "react-icons/fa";

const menuItems = [
  { id: "images", label: "Manage Website Images", icon: <FaImage /> },
  { id: "doctors", label: "Manage Doctor List", icon: <FaUserMd /> },
  { id: "healthcare", label: "Manage Health Care List", icon: <FaHospitalAlt /> },
  { id: "users", label: "Manage User Lists", icon: <FaUsers /> },
];

export default function Sidebar({
  active,
  setActive,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Overlay when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar container */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none flex flex-col
        `}
        aria-label="Sidebar navigation"
      >
        {/* Close button for small screens */}
        <div className="flex items-center justify-between p-4 border-b border-sky-200 lg:hidden">
          <h2 className="text-lg font-bold text-sky-700">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-sky-700 hover:text-sky-900 focus:outline-none"
            aria-label="Close sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex flex-col flex-grow p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setSidebarOpen(false);
              }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition
                ${
                  active === item.id
                    ? "bg-sky-200 text-sky-900"
                    : "text-sky-600 hover:bg-sky-100 hover:text-sky-900"
                }
              `}
              aria-current={active === item.id ? "page" : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="block truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
