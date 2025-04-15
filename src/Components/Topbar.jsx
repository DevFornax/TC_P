// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// function TopBar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [showMobileSidebar, setShowMobileSidebar] = useState(false);

//   const dropdownRef = useRef(null);

//   const handleHomeClick = () => {
//     navigate("/");
//     setDropdownOpen(false);
//     setShowMobileSidebar(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//     setDropdownOpen(false);
//     setShowMobileSidebar(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* Top Bar */}
//       <header className="w-full bg-[#385e72] text-white shadow-md z-50 px-6 py-3 flex justify-between items-center relative">
//         {/* Brand */}
//         <div className="text-2xl font-semibold tracking-wide">
//           Fornax ThermoVis
//         </div>

//         {/* Hamburger for mobile */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setShowMobileSidebar(true)}
//             className="bg-[#6aabd2] text-[#385e72] px-3 py-2 rounded-md font-medium"
//           >
//             ☰
//           </button>
//         </div>

//         {/* Profile Dropdown - only for large screens */}
//         <div className="hidden lg:block relative" ref={dropdownRef}>
//           {user && (
//             <button
//               onClick={() => setDropdownOpen((prev) => !prev)}
//               className="flex items-center space-x-2 bg-[#6aabd2] hover:bg-[#b7cfdc] text-[#385e72] px-4 py-2 rounded-full font-medium transition duration-200 shadow-sm"
//             >
//               <span className="font-semibold">{user.username}</span>
//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   isDropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//           )}

//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in-up">
//               <button
//                 onClick={handleHomeClick}
//                 className="w-full text-left px-4 py-3 text-sm text-[#385e72] hover:bg-[#d9e4ec] transition"
//               >
//                 🏠 Home
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/data-inspection");
//                   setShowMobileSidebar(false);
//                 }}
//                 className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//               >
//                 📊 Dashboard
//               </button>{" "}
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-3 text-sm text-[#385e72] hover:bg-[#d9e4ec] transition"
//               >
//                 🔒 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </header>

//       {showMobileSidebar && (
//         <div className="lg:hidden fixed top-0 left-0 w-64 h-full bg-[#d9e4ec] shadow-md z-50 p-6 space-y-4">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-bold text-[#385e72]">
//               Hello, {user?.username}
//             </h2>
//             <button
//               onClick={() => setShowMobileSidebar(false)}
//               className="text-gray-600 text-xl"
//             >
//               ✕
//             </button>
//           </div>

//           <button
//             onClick={handleHomeClick}
//             className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//           >
//             🏠 Home
//           </button>
//           <button
//             onClick={() => {
//               navigate("/data-inspection");
//               setShowMobileSidebar(false);
//             }}
//             className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//           >
//             📊 Dashboard
//           </button>

//           <button
//             onClick={handleLogout}
//             className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//           >
//             🔒 Logout
//           </button>
//         </div>
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

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [closingSidebar, setClosingSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const openSidebar = () => {
    setClosingSidebar(false);
    setShowMobileSidebar(true);
  };

  const closeSidebar = () => {
    setClosingSidebar(true);
    setTimeout(() => {
      setShowMobileSidebar(false);
    }, 300);
  };

  const handleHomeClick = () => {
    navigate("/");
    closeSidebar();
  };

  const handleDashboardClick = () => {
    navigate("/data-inspection");
    closeSidebar();
  };

  const handleInspectionToolClick = () => {
    navigate("/inspection");
    closeSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    closeSidebar();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    }

    if (showMobileSidebar && !closingSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSidebar, closingSidebar]);

  return (
    <>
      <header className="w-full bg-[#385e72] text-white shadow-md z-50 px-6 py-3 flex justify-between items-center relative">
        <div className="text-2xl font-semibold tracking-wide">
          Fornax ThermoVis
        </div>

        <div>
          <button
            onClick={openSidebar}
            className="bg-[#6aabd2] text-[#385e72] px-3 py-2 rounded-md font-medium"
          >
            ☰
          </button>
        </div>
      </header>

      {showMobileSidebar && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 sm:w-64 w-72 h-full bg-[#d9e4ec] shadow-md z-50 p-6 space-y-4 ${
            closingSidebar ? "animate-slide-out" : "animate-slide-in"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-[#385e72]">
              Hello, {user?.username}
            </h2>
            <button onClick={closeSidebar} className="text-gray-600 text-xl">
              ✕
            </button>
          </div>

          <button
            onClick={handleHomeClick}
            className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
          >
            🏠 Home
          </button>
          <button
            onClick={handleDashboardClick}
            className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
          >
            📊 Dashboard
          </button>
          <button
            onClick={handleInspectionToolClick}
            className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
          >
            🔍 Inspection Tool
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
          >
            🔒 Logout
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }

          @keyframes slideOut {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }

          .animate-slide-in {
            animation: slideIn 0.3s ease-out forwards;
          }

          .animate-slide-out {
            animation: slideOut 0.3s ease-in forwards;
          }
        `}
      </style>
    </>
  );
}

export default TopBar;
