import React from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleHomeClick = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className="flex justify-between items-center bg-[#6c63ff] text-white p-4">
      <div className="text-left flex items-center space-x-3">
        <span className="text-2xl font-semibold">InteliGIs Survey</span>
      </div>

      <div className="text-right flex items-center space-x-6">
        <span
          className="text-lg cursor-pointer hover:text-opacity-80 transition-colors duration-300"
          onClick={handleHomeClick} // Attach the click handler
        >
          Home
        </span>
      </div>
    </div>
  );
}

export default TopBar;
