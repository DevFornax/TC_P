
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
    <div className="p-6 mb-5 border border-[#b7cfdc] rounded-2xl shadow-md bg-[#d9e4ec]">
      <div className="grid gap-6 sm:grid-cols-3 py-2">
        <div className="flex flex-col">
          <label className="block text-[#385e72] font-semibold mb-2 tracking-wide">
            Location ID 
          </label>
          <input
            type="text"
            placeholder="Enter Location ID"
            className="p-3 bg-white text-[#385e72] border border-[#b7cfdc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6aabd2] font-medium shadow-sm"
            value={newLocationID}
            onChange={(e) => setNewLocationID(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="block text-[#385e72] font-semibold mb-2 tracking-wide">
            Select Device Type
          </label>
          <select
            name="selection"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            className="p-3 bg-white text-[#385e72] border border-[#b7cfdc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6aabd2] font-medium shadow-sm"
          >
            <option value="Select">Select an option</option>
            <option value="Transformer">Transformer</option>
            <option value="Switch">Switch</option>
            <option value="Fuse">Fuse</option>{" "}
            <option value="CTPT">CTPT</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleLocationSearch}
            disabled={loading}
            className="bg-[#385e72] hover:bg-[#1f3947]  text-white font-semibold px-5 py-3 rounded-lg w-full transition-all duration-300 disabled:opacity-50"
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
