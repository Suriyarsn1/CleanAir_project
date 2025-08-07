import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const userToken = localStorage.getItem("token");
  const uName = localStorage.getItem("userName");
  const uRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    handleLogout();
  };

  const myPredictions = (e) => {
    e.preventDefault();
    navigate("/lungscancerform");
  };
  
  const handleAdminHome = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <nav className="bg-[#F7F4DF] p-4 shadow-sm sticky top-0 z-40">
      {!userToken ? (
        <div className="flex justify-end pr-4 font-medium fade-in">
          <a
            href="/login"
            className="text-sky-700 hover:text-sky-900 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Sign In
          </a>
        </div>
      ) : uRole === "admin" ? (
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
            onClick={handleAdminHome}
            className="text-red-600 hover:text-red-800 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Sign Off"
          >
            AdminHome
          </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-4 max-w-screen-xl mx-auto font-medium fade-in">
          <p className="text-sky-800 select-text">Welcome, {uName}!</p>
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={myPredictions}
              className="text-sky-700 hover:text-sky-900 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500 whitespace-nowrap"
            >
              My Predictions
            </button>
            <button
              onClick={onLogoutClick}
              className="text-red-600 hover:text-red-800 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 whitespace-nowrap"
              aria-label="Sign Off"
            >
              Sign Off
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
