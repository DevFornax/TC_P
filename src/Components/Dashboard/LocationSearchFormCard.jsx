// components/LocationSearchFormCard.jsx
import React from "react";

const LocationSearchFormCard = ({
  newLocationID,
  setNewLocationID,
  selection,
  setSelection,
  handleLocationSearch,
  loading,
  error,
}) => {
  return (
    <div className="p-6 mb-5 border border-gray-300 rounded-xl shadow-lg bg-white">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col">
          <label className="block font-bold mb-1">Location ID 266102</label>
          <input
            type="text"
            placeholder="Enter Location ID"
            className="font-bold p-3 bg-gray-100 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
            value={newLocationID}
            onChange={(e) => setNewLocationID(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="block font-bold mb-1">Select Device Type</label>
          <select
            name="selection"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            className="font-bold p-3 bg-gray-100 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]"
          >
            <option value="Select">Select an option</option>
            <option value="Transformer">Transformer</option>
            <option value="Switch">Switch</option>
            <option value="Fuse">Fuse</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleLocationSearch}
            className="bg-[#6c63ff] hover:bg-[#5951e6] text-white font-semibold px-5 py-3 rounded-lg w-full transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Checking..." : "Search"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm text-right pt-2 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
};

export default LocationSearchFormCard;
