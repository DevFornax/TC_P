import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [locationID, setLocationID] = useState("");
  const [selection, setSelection] = useState("Select");
  const [error, setError] = useState(""); 

  const handleSubmit = () => {
   
    if (!locationID || !selection || selection === "Select") {
      setError("Both fields are required!"); 
      return; 
    }

    const payload = {
      locationID,
      selection,
    };

    localStorage.setItem("payload", JSON.stringify(payload));

    navigate("/sld-view", { state: payload });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto bg-white rounded-lg border border-black shadow-lg">
        <div className="flex justify-center items-center w-full md:w-1/2 p-4">
          <img
            src="/undraw_qa-engineers_kgp8.svg"
            alt="Login Illustration"
            className="w-full md:w-auto aspect-square"
          />
        </div>
        <div className="flex flex-col justify-center p-4 w-full md:w-1/2 lg:pl-12">
          <p className="text-left font-extrabold text-3xl md:text-4xl mb-6 md:mb-12">
            Enter Location Details
          </p>

          {/* Location ID input */}
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Location ID
          </label>
          <input
            type="text"
            name="locationID"
            value={locationID}
            onChange={(e) => setLocationID(e.target.value)}
            className="mt-1 border-2 border-gray-300 font-bold block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Location ID"
          />

          {/* Type dropdown */}
          <label className="block text-gray-700 text-lg font-medium mt-4 mb-2">
            Type
          </label>
          <select
            name="selection"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            className="mt-1 mb-5 border-2 border-gray-300 font-bold block w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Select">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>

       
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
