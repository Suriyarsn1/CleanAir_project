import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import SectionWebsiteImages from "../components/sections/sectionWebsiteImages";
import SectionDoctorList from "../components/sections/sectionDoctorlist";
import SectionHealthCareList from "../components/sections/sectionHealthcarelist";
import SectionUserList from "../components/sections/sectionUserlist";
import { AuthContext } from "../context/authContext";

const SECTIONS = {
  images: SectionWebsiteImages,
  doctors: SectionDoctorList,
  healthcare: SectionHealthCareList,
  users: SectionUserList,
};

export default function AdminPanel() {
  const [active, setActive] = useState("images");
  const [sidebarOpen, setSidebarOpen] = useState(false); 
const uName = localStorage.getItem("userName");
  const ActiveSection = SECTIONS[active];
  const navigate=useNavigate();
   const {  handleLogout } = useContext(AuthContext);

const handleHomePage = (e) => {
    e.preventDefault();
    navigate("/");
  };

   const onLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
  };


  return (<><nav className="bg-[#F7F4DF] p-4 shadow-sm sticky top-0 z-40">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-4 max-w-screen-xl mx-auto font-medium fade-in">
          <p className="text-sky-800 select-text">Welcome, {uName}!</p>
          <div>
          <button
            onClick={onLogoutClick}
            className="text-red-600 hover:text-red-800 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Sign Off"
          >
            Sign Off
          </button>
          <button
            onClick={handleHomePage}
            className="text-red-600 hover:text-red-800 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Sign Off"
          >
            Home Page
          </button>
          </div>
        </div>
    <div className="flex h-screen bg-sky-50 text-sky-900 relative">
      
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-sky-700 bg-white shadow-lg hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label="Open sidebar"
      >
        {/* Hamburger icon */}
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content, dims and disables scrolling when sidebar open on small screens */}
      <main
        className="flex-grow p-8 overflow-auto transition-filter duration-300"
        style={{
          filter: sidebarOpen ? "brightness(0.75)" : "none",
          pointerEvents: sidebarOpen ? "none" : "auto",
        }}
        onClick={() => {
          if (sidebarOpen) setSidebarOpen(false); // close sidebar on outside click
        }}
      >
        <ActiveSection />
      </main>
    </div>
    </nav>
 </> );
}
