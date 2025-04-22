// import React, { useState } from "react";
// import axios from "../utils/axiosInstance";

// const LeftSidebar = ({
  // LeftsidebarOpen,
  // toggleLeftSidebar,
  // onLocationDataFetched,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [id, setId] = useState("");
//   const [method, setMethod] = useState("project");
//   const [responseData, setResponseData] = useState(null);

//   const handleSearch = async () => {
//     if (!id || !method) {
//       alert("Please enter both ID and select method");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResponseData(null);

//     try {
//       const response = await axios.post("/get-project-data", {
//         id: id,
//         method: method,
//       });

//       console.log("📦 Response Data:", response.data);
//       setResponseData(response.data);
//       onLocationDataFetched(response.data.locations);

      
//       setId("");
//       setMethod("project");
//     } catch (error) {
//       console.error("❌ Fetch Error:", error.response?.data || error.message);

//       setError(
//         error.response?.data?.error ||
//           "An error occurred while fetching the data. Please try again."
//       );
//       alert(
//         `❌ Error: ${error.response?.data?.error || "Something went wrong."}`
//       );

     
//       setId("");
//       setMethod("project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (

    // <div
    //   className={`fixed top-0 left-0 mt-16 h-full w-64 bg-[#d9e4ec] shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${
    //     LeftsidebarOpen ? "translate-x-0" : "-translate-x-full"
    //   }`}
    // >
//       <div className="p-6 border-b text-[#385e72] font-bold text-lg">
//         Sidebar
//       </div>

//       <div className="pt-3 p-4">
 
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#385e72]">
//             Search by ID
//           </label>
//           <input
//             type="text"
//             className="mt-2 p-3 w-full border border-[#b7cfdc] rounded focus:ring-2 focus:ring-[#6aabd2] transition duration-200"
//             placeholder="Enter Project ID or Location ID"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//         </div>

//         {/* Select Method */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-[#385e72]">
//             Select Method
//           </label>
//           <select
//             className="mt-2 p-3 w-full border border-[#b7cfdc] rounded focus:ring-2 focus:ring-[#6aabd2] transition duration-200"
//             value={method}
//             onChange={(e) => setMethod(e.target.value)}
//           >
//             <option value="project">Project</option>
//             <option value="location">Location</option>
//           </select>
//         </div>

//         {/* Search Button */}
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="mt-6 p-3 bg-[#385e72] text-white rounded w-full disabled:bg-[#a2b7c6] focus:ring-2 focus:ring-[#6aabd2] transition duration-200"
//         >
//           {loading ? "Loading..." : "Search"}
//         </button>
//       </div>

//       {/* Sidebar Footer with Close Button */}
//       <div className="absolute bottom-6 left-6 flex justify-between items-center w-full p-2">
//         <button
//           onClick={toggleLeftSidebar}
//           className="text-xl font-bold text-[#385e72] hover:text-[#6aabd2] transition duration-200"
//         >
//           &larr; {/* Left Arrow */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;



// import React, { useState } from "react";

// import axios from "../utils/axiosInstance";

// const LeftSidebar = ({  LeftsidebarOpen,
//   onLocationDataFetched, }) => {
//   const [activeSection, setActiveSection] = useState("search");
//   const [id, setId] = useState("");
//   const [method, setMethod] = useState("project");
//   const [loading, setLoading] = useState(false);

//   const toggleSection = (section) => {
//     setActiveSection((prev) => (prev === section ? null : section));
//   };

//   const handleSearch = async () => {
//     if (!id.trim()) {
//       alert("Please enter a valid ID.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const { data } = await axios.post("/get-project-data", { id, method });
//       console.log("📦 Response:", data);
//       onLocationDataFetched(data.locations || []);
//       setId("");
//       setMethod("project");
//     } catch (err) {
//       console.error("❌ Error:", err.response?.data || err.message);
//       alert(err?.response?.data?.error || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };
 



//   return (
   
//     <div
//       className={`fixed top-0 left-0 mt-16 h-full w-92 bg-[#d9e4ec] shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${
//         LeftsidebarOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       <div className="flex h-full">
//         <div className="flex flex-col items-center bg-[#385e72] text-white w-12 py-4 space-y-6 shadow-md">
//           <button
//             onClick={() => toggleSection("search")}
//             className={`hover:text-yellow-300 transition ${
//               activeSection === "search" ? "bg-white p-2 rounded" : ""
//             }`}
//           >
//             🔍
//           </button>

//           <button
//             onClick={() => toggleSection("settings")}
//             className={`hover:text-yellow-300 transition ${
//               activeSection === "settings" ? "bg-white p-2 rounded" : ""
//             }`}
//           >
//             ⚙️
//           </button>
//         </div>

//         {/* Right Content Section */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {activeSection === "search" && (
//             <div>
//               <h2 className="text-lg font-bold text-[#385e72] mb-4">
//                 🔍 Search
//               </h2>

//               <label className="block text-sm font-medium text-[#385e72] mb-1">
//                 Search by ID
//               </label>
//               <input
//                 type="text"
//                 className="mb-4 p-2 w-full border border-[#b7cfdc] rounded focus:ring-2 focus:ring-[#6aabd2]"
//                 placeholder="Enter Project or Location ID"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//               />

//               <label className="block text-sm font-medium text-[#385e72] mb-1">
//                 Select Method
//               </label>
//               <select
//                 value={method}
//                 onChange={(e) => setMethod(e.target.value)}
//                 className="mb-4 p-2 w-full border border-[#b7cfdc] rounded focus:ring-2 focus:ring-[#6aabd2]"
//               >
//                 <option value="project">Project</option>
//                 <option value="location">Location</option>
//               </select>

//               <button
//                 onClick={handleSearch}
//                 disabled={loading}
//                 className="w-full bg-[#385e72] text-white py-2 rounded disabled:bg-[#a2b7c6]"
//               >
//                 {loading ? "Loading..." : "Search"}
//               </button>

              
//             </div>
//           )}

//           {activeSection === "settings" && (
//             <div>
//               <h2 className="text-lg font-bold text-[#385e72] mb-4">
//                 ⚙️ Settings
//               </h2>
//               <p className="text-sm text-gray-600">
//                 More content coming soon...
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;



import React, { useState } from "react";
import axios from "../utils/axiosInstance";

const LeftSidebar = ({ LeftsidebarOpen, onLocationDataFetched }) => {
  const [activeSection, setActiveSection] = useState("search");
  const [id, setId] = useState("");
  const [method, setMethod] = useState("project");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!id.trim()) {
      alert("Please enter a valid ID.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/get-project-data", { id, method });
      console.log("📦 Response:", data);
      onLocationDataFetched(data.locations || []);
      setId("");
      setMethod("project");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 mt-16 h-full w-72 bg-[#d9e4ec] shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${
        LeftsidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full">

        <div className="flex flex-col items-center bg-[#385e72] text-white w-12 py-4 space-y-6 shadow-md">
          <button
            onClick={() => setActiveSection("search")}
            className={`hover:text-yellow-300 transition ${
              activeSection === "search"
                ? "bg-white text-[#385e72] p-2 rounded"
                : ""
            }`}
          >
            🔍
          </button>

          <button
            onClick={() => setActiveSection("settings")}
            className={`hover:text-yellow-300 transition ${
              activeSection === "settings"
                ? "bg-white text-[#385e72] p-2 rounded"
                : ""
            }`}
          >
            ⚙️
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === "search" && (
            <div>
              <h2 className="text-lg font-bold text-[#385e72] mb-4">
                🔍 Search
              </h2>
              <label className="block text-sm font-medium text-[#385e72] mb-1">
                Search by ID
              </label>
              <input
                type="text"
                className="mb-4 p-2 w-full border border-[#b7cfdc] rounded focus:ring-2 focus:ring-[#6aabd2]"
                placeholder="Enter Project or Location ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />

              <label className="block text-sm font-medium text-[#385e72] mb-1">
                Select Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mb-4 p-2 w-full border border-[#b7cfdc] rounded focus:ring-2 focus:ring-[#6aabd2]"
              >
                <option value="project">Project</option>
                <option value="location">Location</option>
              </select>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-[#385e72] text-white py-2 rounded disabled:bg-[#a2b7c6]"
              >
                {loading ? "Loading..." : "Search"}
              </button>
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h2 className="text-lg font-bold text-[#385e72] mb-4">
                ⚙️ Settings
              </h2>
              <p className="text-sm text-gray-600">
                More content coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
