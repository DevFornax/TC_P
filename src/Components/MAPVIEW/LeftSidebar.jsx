import React from "react";

const LeftSidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 mt-16 h-full w-64 bg-white shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b font-bold text-lg">Sidebar</div>
      <div className="p-4">🗂️ Your stuff here!</div>
     
    </div>
  );
};

export default LeftSidebar;
