import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleHomeClick = () => {
    navigate("/");
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

  return (
    <>
      <div className="flex justify-between items-center bg-[#6c63ff] text-white p-5 relative z-30">
        <button
          className="md:hidden text-2xl font-bold"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "☰"}
        </button>
      
        <h2 className="text-2xl p-4 pt-6 font-bold text-white mb-4 sm:mb-0">
          Fornax ThermoVis
        </h2>
        <div className="hidden md:flex items-center space-x-6">
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
            className="text-lg cursor-pointer hover:text-opacity-80 transition"
            onClick={handleHomeClick}
          >
            Home
          </span>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 space-y-6">
          <p className="text-xl font-bold border-b pb-2">Menu</p>
          {user && (
            <div className="text-md font-medium">👤 {user.username}</div>
          )}
          <button
            onClick={handleHomeClick}
            className="block w-full text-left hover:text-[#6c63ff] transition"
          >
            Home
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left hover:text-[#6c63ff] transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Dim background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default TopBar;
