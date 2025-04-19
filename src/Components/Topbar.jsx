
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuthData } from "../Components/utils/authStorage";
// import { Link } from "react-router-dom";

// function TopBar() {
//   const navigate = useNavigate();
//   const [showMobileSidebar, setShowMobileSidebar] = useState(false);
//   const [closingSidebar, setClosingSidebar] = useState(false);
//   const sidebarRef = useRef(null);
//   const [showHeader, setShowHeader] = useState(true);
//   const lastScrollY = useRef(window.scrollY);
//   const [username, setUsername] = useState("Guest");

//   useEffect(() => {
//     const auth = getAuthData();
//     setUsername(auth?.user?.username || "Guest");
//   }, []);

//   const openSidebar = () => {
//     setClosingSidebar(false);
//     setShowMobileSidebar(true);
//   };

//   const closeSidebar = () => {
//     setClosingSidebar(true);
//     setTimeout(() => {
//       setShowMobileSidebar(false);
//     }, 300);
//   };

//   const handleHomeClick = () => {
//     navigate("/");
//     closeSidebar();
//   };

//   const handleDashboardClick = () => {
//     navigate("/data-inspection");
//     closeSidebar();
//   };

//   const handleInspectionToolClick = () => {
//     navigate("/inspection");
//     closeSidebar();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     navigate("/login");
//     closeSidebar();
//   };

//   useEffect(() => {
//     const handleKeydown = (event) => {
      

//       if (
//         event.ctrlKey &&
//         event.altKey &&
//         (event.key === "o" || event.key === "O" || event.keyCode === 79)
//       ) {
        
//         openSidebar();
//       }
//     };

  
//     window.addEventListener("keydown", handleKeydown);

  
//     return () => {
//       window.removeEventListener("keydown", handleKeydown);
//     };
//   }, []); 


//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         closeSidebar();
//       }
//     }

//     if (showMobileSidebar && !closingSidebar) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showMobileSidebar, closingSidebar]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
//         setShowHeader(true);
//       } else {
//         setShowHeader(false);
//       }

//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <header
//         className={`w-full bg-[#385e72] text-white shadow-md z-50 px-6 py-3 flex justify-between items-center fixed top-0 left-0 transition-transform duration-300 ${
//           showHeader ? "translate-y-0" : "-translate-y-full"
//         }`}
//       >
//         <Link
//           to="/"
//           className="text-2xl font-semibold tracking-wide hover:underline"
//         >
//           Fornax ThermoVis
//         </Link>

//         <div>
//           <button
//             onClick={openSidebar}
//             className="bg-[#6aabd2] text-[#385e72] px-3 py-2 rounded-md font-medium"
//           >
//             ☰
//           </button>
//         </div>
//       </header>

//       {showMobileSidebar && (
//         <div
//           ref={sidebarRef}
//           className={`fixed top-0 left-0 sm:w-64 w-72 h-full bg-[#d9e4ec] shadow-md z-50 p-6 ${
//             closingSidebar ? "animate-slide-out" : "animate-slide-in"
//           } flex flex-col justify-between`}
//         >
//           <div className="space-y-4">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-bold text-[#385e72]">
//                 Hello, {username}
//               </h2>
//               <button onClick={closeSidebar} className="text-gray-600 text-xl">
//                 ✕
//               </button>
//             </div>

//             <button
//               onClick={handleHomeClick}
//               className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//             >
//               🏠 Home
//             </button>
//             <button
//               onClick={handleDashboardClick}
//               className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//             >
//               📊 Dashboard
//             </button>
//             <button
//               onClick={handleInspectionToolClick}
//               className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//             >
//               🔍 Inspection Tool
//             </button>
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 bg-white rounded text-[#385e72] hover:bg-[#b7cfdc] font-medium"
//             >
//               🔒 Logout
//             </button>
//           </div>

//           <div className="text-center text-sm text-[#385e72] pt-6">
//             Made with <span className="text-red-500">❤️</span> by{" "}
//             <a
//               href="https://www.fornaxet.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline text-[#385e72] hover:text-blue-500"
//             >
//               Fornax
//             </a>
//           </div>
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes slideIn {
//             from { transform: translateX(-100%); }
//             to { transform: translateX(0); }
//           }

//           @keyframes slideOut {
//             from { transform: translateX(0); }
//             to { transform: translateX(-100%); }
//           }

//           .animate-slide-in {
//             animation: slideIn 0.3s ease-out forwards;
//           }

//           .animate-slide-out {
//             animation: slideOut 0.3s ease-in forwards;
//           }
//         `}
//       </style>
//     </>
//   );
// }

// export default TopBar;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../Components/utils/authStorage";
import { Link } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [closingSidebar, setClosingSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const auth = getAuthData();
    setUsername(auth?.user?.username || "Guest");
  }, []);

  const openSidebar = () => {
    if (!showMobileSidebar) {

      setClosingSidebar(false);
      setShowMobileSidebar(true);
    }
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
    localStorage.removeItem("auth");
  
    navigate("/login");
    closeSidebar();
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      if (
        event.ctrlKey &&
        event.altKey &&
        (event.key === "o" || event.key === "O" || event.keyCode === 79)
      ) {
        openSidebar();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full bg-[#385e72] text-white shadow-md z-50 px-6 py-3 flex justify-between items-center fixed top-0 left-0 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wide hover:underline"
        >
          Fornax ThermoVis
        </Link>

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
          className={`fixed top-0 left-0 sm:w-64 w-72 h-full bg-[#d9e4ec] shadow-md z-50 p-6 ${
            closingSidebar ? "animate-slide-out" : "animate-slide-in"
          } flex flex-col justify-between`}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-[#385e72]">
                Hello, {username}
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

          <div className="text-center text-sm text-[#385e72] pt-6">
            Made with <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://www.fornaxet.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#385e72] hover:text-blue-500"
            >
              Fornax
            </a>
          </div>
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
