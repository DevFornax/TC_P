import React from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-[#6c63ff] text-white p-5">
      <div className="text-left flex items-center space-x-3">
        <span className="text-2xl font-semibold">InteliGIs Survey</span>
      </div>

      <div className="text-right flex items-center space-x-6">
        {user && (
          <>
            <span className="text-lg font-medium">👤 {user.username}</span>

            <button
              onClick={handleLogout}
              className="text-sm bg-white text-[#6c63ff] px-3 py-1 rounded-md font-semibold hover:bg-opacity-90 transition"
            >
              Logout
            </button>
          </>
        )}

        <span
          className="text-lg cursor-pointer hover:text-opacity-80 transition-colors duration-300"
          onClick={handleHomeClick}
        >
          Home
        </span>
      </div>
    </div>
  );
}

export default TopBar;
