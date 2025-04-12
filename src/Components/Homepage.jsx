// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const navigate = useNavigate();
//   const [locationID, setLocationID] = useState("");
//   const [selection, setSelection] = useState("Select");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const API_URL = import.meta.env.VITE_API_BASE_URL;

//   const handleSubmit = async () => {
//     setError("");
//     if (!locationID || isNaN(locationID)) {
//       setError("Location ID must be a valid number.");
//       return;
//     }
//     if (!selection || selection === "Select") {
//       setError("Please select a valid type.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${API_URL}/check-location-exist`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ location_id: parseInt(locationID) }),
//       });

//       const data = await res.json();

//       if (!res.ok || data.status !== "exists") {
//         setError("Location ID not found.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         locationID: parseInt(locationID),
//         selection,
//       };

//       localStorage.setItem("payload", JSON.stringify(payload));
//       navigate("/sld-view", { state: payload });
//     } catch (error) {
//       console.error("Error checking location:", error);
//       setError("Something went wrong while checking the ID.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-3">
//       <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto bg-white rounded-lg  shadow-lg">
//         <div className="flex justify-center items-center w-full md:w-1/2 p-4">
//           <img
//             src="/undraw_qa-engineers_kgp8.svg"
//             alt="Login Illustration"
//             className="w-full md:w-auto aspect-square"
//           />
//         </div>
//         <div className="flex flex-col justify-center p-4 w-full md:w-1/2 lg:pl-12">
//           <p className="text-left font-extrabold text-3xl md:text-4xl mb-6 md:mb-12">
//             Enter Location Details
//           </p>

//           <label className="block text-gray-700 text-lg font-medium mb-2">
//             Location ID 266293
//           </label>
//           <input
//             type="text"
//             name="locationID"
//             value={locationID}
//             onChange={(e) => setLocationID(e.target.value)}
//             className="mt-1 border-2 border-gray-300 font-bold block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Location ID"
//           />

//           <label className="block text-gray-700 text-lg font-medium mt-4 mb-2">
//             Type
//           </label>
//           <select
//             name="selection"
//             value={selection}
//             onChange={(e) => setSelection(e.target.value)}
//             className="mt-1 mb-5 border-2 border-gray-300 font-bold block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Select">Select an option</option>
//             <option value="Transformer">Transformer</option>
//             <option value="Switch">Switch</option>
//             <option value="Fuse">Fuse</option>
//           </select>

//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#6c63ff] hover:bg-[#5951e6]"
//             } text-white px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out`}
//           >
//             {loading ? "Checking..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const navigate = useNavigate();
//   const [locationID, setLocationID] = useState("");
//   const [selection, setSelection] = useState("Select");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const API_URL = import.meta.env.VITE_API_BASE_URL;

//   const handleSubmit = async () => {
//     setError("");
//     if (!locationID || isNaN(locationID)) {
//       setError("Location ID must be a valid number.");
//       return;
//     }
//     if (!selection || selection === "Select") {
//       setError("Please select a valid type.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${API_URL}/check-location-exist`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ location_id: parseInt(locationID) }),
//       });

//       const data = await res.json();

//       if (!res.ok || data.status !== "exists") {
//         setError("Location ID not found.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         locationID: parseInt(locationID),
//         selection,
//       };

//       localStorage.setItem("payload", JSON.stringify(payload));
//       navigate("/dashboard", { state: payload });
//     } catch (error) {
//       console.error("Error checking location:", error);
//       setError("Something went wrong while checking the ID.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-3">
//       <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto bg-white rounded-lg  shadow-lg">
//         <div className="flex justify-center items-center w-full md:w-1/2 p-4">
//           <img
//             src="/undraw_qa-engineers_kgp8.svg"
//             alt="Login Illustration"
//             className="w-full md:w-auto aspect-square"
//           />
//         </div>
//         <div className="flex flex-col justify-center p-4 w-full md:w-1/2 lg:pl-12">
//           <p className="text-left font-extrabold text-3xl md:text-4xl mb-6 md:mb-12">
//             Enter Location Details
//           </p>

//           <label className="block text-gray-700 text-lg font-medium mb-2">
//             Location ID 266293
//           </label>
//           <input
//             type="text"
//             name="locationID"
//             value={locationID}
//             onChange={(e) => setLocationID(e.target.value)}
//             className="mt-1 border-2 border-gray-300 font-bold block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Location ID"
//           />

//           <label className="block text-gray-700 text-lg font-medium mt-4 mb-2">
//             Type
//           </label>
//           <select
//             name="selection"
//             value={selection}
//             onChange={(e) => setSelection(e.target.value)}
//             className="mt-1 mb-5 border-2 border-gray-300 font-bold block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="Select">Select an option</option>
//             <option value="Transformer">Transformer</option>
//             <option value="Switch">Switch</option>
//             <option value="Fuse">Fuse</option>
//           </select>

//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#6c63ff] hover:bg-[#5951e6]"
//             } text-white px-6 py-3 rounded-lg font-medium transition duration-200 ease-in-out`}
//           >
//             {loading ? "Checking..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
