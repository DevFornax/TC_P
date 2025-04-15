

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function TopBar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const handleHomeClick = () => {
//     navigate("/");
//     setSidebarOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//     setSidebarOpen(false);
//   };

//   useEffect(() => {
//     if (isSidebarOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [isSidebarOpen]);

//   return (
//     <>
//       {/* Top Navbar */}
//       <div className="w-full bg-[#6c63ff] text-white px-5 py-4 flex items-center justify-between shadow-md z-30 relative">
//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-3xl"
//           onClick={() => setSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? "✖" : "☰"}
//         </button>

//         {/* Logo/Brand */}
//         <p className="text-xl md:text-2xl font-bold text-center w-full md:w-auto md:text-left">
//           Fornax ThermoVis
//         </p>

//         {/* Desktop Actions */}
//         <div className="hidden md:flex items-center space-x-6">
//           {user && <span className="text-md">👤 {user.username}</span>}
//           <span
//             onClick={handleHomeClick}
//             className="cursor-pointer hover:underline"
//           >
//             Home
//           </span>
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="bg-white text-[#6c63ff] px-3 py-1 rounded-md font-semibold hover:bg-opacity-90 transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Sidebar (Mobile) */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-xl z-40 transform transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-6 space-y-6">
//           <p className="text-xl font-bold border-b pb-3">Navigation</p>
//           {user && (
//             <div className="text-md font-medium">👤 {user.username}</div>
//           )}
//           <button
//             onClick={handleHomeClick}
//             className="block w-full text-left text-gray-800 hover:text-[#6c63ff] transition"
//           >
//             Home
//           </button>
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="block w-full text-left text-gray-800 hover:text-[#6c63ff] transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>

      
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// export default TopBar;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function TopBar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const handleHomeClick = () => {
//     navigate("/");
//     setSidebarOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//     setSidebarOpen(false);
//   };

//   useEffect(() => {
//     document.body.classList.toggle("overflow-hidden", isSidebarOpen);
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [isSidebarOpen]);

//   return (
//     <>
      
//       <div className="w-full bg-[#385e72] text-white px-5 py-4 flex items-center justify-between shadow-md z-30 relative">
//         {/* Mobile Menu Toggle */}
//         <button
//           className="md:hidden text-3xl"
//           onClick={() => setSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? "✖" : "☰"}
//         </button>

//         {/* Logo/Brand */}
//         <p className="text-xl md:text-2xl font-bold text-center w-full md:w-auto md:text-left">
//           Fornax ThermoVis
//         </p>

//         {/* Desktop Actions */}
//         <div className="hidden md:flex items-center space-x-6">
//           {user && <span className="text-md">👤 {user.username}</span>}
//           <span
//             onClick={handleHomeClick}
//             className="cursor-pointer hover:underline"
//           >
//             Home
//           </span>
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="bg-[#d9e4ec] text-[#385e72] px-3 py-1 rounded-md font-semibold hover:bg-[#b7cfdc] transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Sidebar (Mobile) */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#d9e4ec] text-[#385e72] shadow-xl z-40 transform transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-6 space-y-6">
//           <p className="text-xl font-bold border-b pb-3">Navigation</p>
//           {user && (
//             <div className="text-md font-medium">👤 {user.username}</div>
//           )}
//           <button
//             onClick={handleHomeClick}
//             className="block w-full text-left hover:text-[#6aabd2] transition"
//           >
//             Home
//           </button>
//           {user && (
//             <button
//               onClick={handleLogout}
//               className="block w-full text-left hover:text-[#6aabd2] transition"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// export default TopBar;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleHomeClick = () => {
    navigate("/");
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-[#385e72] text-white shadow-md z-50 px-6 py-3 flex justify-between items-center relative">
      {/* Brand */}
      <div className="text-2xl font-semibold tracking-wide">
        Fornax ThermoVis
      </div>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        {user && (
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 bg-[#6aabd2] hover:bg-[#b7cfdc] text-[#385e72] px-4 py-2 rounded-full font-medium transition duration-200 shadow-sm"
          >
            <span className="font-semibold">{user.username}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in-up">
            <button
              onClick={handleHomeClick}
              className="w-full text-left px-4 py-3 text-sm text-[#385e72] hover:bg-[#d9e4ec] transition"
            >
              🏠 Home
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-[#385e72] hover:bg-[#d9e4ec] transition"
            >
              🔒 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
