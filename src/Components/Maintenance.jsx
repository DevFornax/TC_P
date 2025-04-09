import React, { useState } from "react";

function Maintenance({
  locationdata,
  selectedPoint,
  setLocationData,
  setselectedPoint,
  setLocationIDforchild,
}) {
  const [newLocationID, setNewLocationID] = useState("");
  const [selection, setSelection] = useState("General"); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLocationSearch = async () => {
    if (!newLocationID || isNaN(newLocationID)) {
      setError("Location ID must be a valid number.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_URL}/check-locationid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location_id: parseInt(newLocationID) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Location not found");
        return;
      }

      setLocationData(data);
      setNewLocationID("");
      setLocationIDforchild(parseInt(newLocationID)); 
    } catch (err) {
      console.error("Error fetching new location:", err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!locationdata) {
    return <div className="text-gray-500">No data available.</div>;
  }

  const { project_name, substation_name, attributes } = locationdata;
  const {
    point_type,
    point_no,
    area_code,
    lat,
    lng,
    point_props = {},
    line_props = {},
  } = attributes;

  return (
    <div className="p-4 border border-gray-300 rounded shadow bg-white space-y-4">
      <h2 className="text-xl font-bold text-blue-600">Maintenance Info</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter Location ID"
          className="border px-3 py-2 rounded w-full sm:w-64"
          value={newLocationID}
          onChange={(e) => setNewLocationID(e.target.value)}
        />
        <button
          onClick={handleLocationSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Another Location"}
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Project:</span> {project_name}
        </p>
        <p>
          <span className="font-semibold">Substation:</span> {substation_name}
        </p>
        <p>
          <span className="font-semibold">Point Type:</span> {point_type}
        </p>
        <p>
          <span className="font-semibold">Point No:</span> {point_no}
        </p>
        <p>
          <span className="font-semibold">Area Code:</span> {area_code}
        </p>
        <p>
          <span className="font-semibold">Latitude:</span> {lng}
        </p>
        <p>
          <span className="font-semibold">Longitude:</span> {lat}
        </p>
      </div>

      {/* Pole Props */}
      <div>
        <h3 className="font-semibold text-gray-700 underline">
          Pole Properties
        </h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Support Type:</strong> {point_props.support_type}
          </li>
          <li>
            <strong>Structure Type:</strong> {point_props.structure_type}
          </li>
          <li>
            <strong>Pole Type:</strong> {point_props.pole_type}
          </li>
          <li>
            <strong>Earthing Type:</strong> {point_props.earthing_type}
          </li>
          <li>
            <strong>Scheme:</strong> {point_props.scheme}
          </li>
        </ul>
      </div>

      {/* Line Props */}
      <div>
        <h3 className="font-semibold text-gray-700 underline">
          Line Properties
        </h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Position:</strong> {line_props.position}
          </li>
          <li>
            <strong>Type:</strong> {line_props.type}
          </li>
          <li>
            <strong>Spare Line:</strong>{" "}
            {line_props.has_spare_line ? "Yes" : "No"}
          </li>
        </ul>
      </div>

      {selectedPoint && (
        <>
          <hr className="my-4" />
          <h3 className="text-lg font-semibold">Selected Point Info</h3>
          <p>
            <strong>ID:</strong> {selectedPoint.id}
          </p>
        </>
      )}
    </div>
  );
}

export default Maintenance;
