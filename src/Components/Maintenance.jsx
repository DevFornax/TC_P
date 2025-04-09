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

  const { id, project_name, substation_name, attributes } = locationdata;
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
  <>
    <div className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
      <div className="">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
          <h2 className="text-2xl font-bold text-[#6c63ff] mb-4 sm:mb-0">
            Maintenance Information
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex flex-col w-full sm:w-64">
              <input
                type="text"
                placeholder="Enter Location ID"
                className="border px-3 py-2 rounded-md"
                value={newLocationID}
                onChange={(e) => setNewLocationID(e.target.value)}
              />
            </div>
            <button
              onClick={handleLocationSearch}
              className= " bg-[#6c63ff] hover:bg-[#5951e6] sm:w-auto w-full text-white px-5 py-2 rounded-md transition"
              disabled={loading}
            >
              {loading ? "Checking..." : "Location"}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-600 text-sm text-end p-0 m-0">{error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3  text-sm">
        <InfoItem label="Location ID" value={id} />
        <InfoItem label="Project" value={project_name} />
        <InfoItem label="Substation" value={substation_name} />
        <InfoItem label="Point Type" value={point_type} />
        <InfoItem label="Point No" value={point_no} />
        <InfoItem label="Area Code" value={area_code} />
        <InfoItem label="Latitude" value={lng} />
        <InfoItem label="Longitude" value={lat} />
      </div>
      <div>
        <SectionWithToggle>
          {/* Pole Properties */}
          <InfoItem label="Support Type" value={point_props.support_type} />
          <InfoItem label="Structure Type" value={point_props.structure_type} />
          <InfoItem label="Pole Type" value={point_props.pole_type} />
          <InfoItem label="Earthing Type" value={point_props.earthing_type} />
          <InfoItem label="Scheme" value={point_props.scheme} />

          {/* Line Properties */}
          <InfoItem label="Position" value={line_props.position} />
          <InfoItem label="Type" value={line_props.type} />
          <InfoItem
            label="Spare Line"
            value={line_props.has_spare_line ? "Yes" : "No"}
          />
        </SectionWithToggle>
      </div>
    </div>
    {selectedPoint && (
      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold text-blue-600">
          Selected Point Info
        </h3>
        <InfoItem label="ID" value={selectedPoint.id} />
      </div>
    )}
  </>
);

}

export default Maintenance;

const InfoItem = ({ label, value }) => (
  <div className="flex  gap-2">
    <span className="text-gray-500 font-medium">{label}:</span>
    <span className="text-gray-800 text-right">{value ?? "—"}</span>
  </div>
);

const SectionWithToggle = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="  bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => setOpen(!open)}
          className="text-blue-600 text-sm hover:underline"
        >
          {open ? "Hide Details" : "View More Details"}
        </button>
      </div>


      {open && (
        <div className="mt-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};