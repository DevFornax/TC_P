import React, { useState } from "react";
import { InfoItem } from "./UI/InfoItem";
import { SectionWithToggle } from "./UI/SectionwithToggle";

import MaitenanceForm from "./MaitenanceForm";

function MaintenancePage({
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
  const [activeView, setActiveView] = useState(null);

  const handleLocationSearch = async () => {
    if (!newLocationID || isNaN(newLocationID)) {
      setError("Location ID must be a valid number.");

      setTimeout(() => {
        setError(null);
      }, 5000);

      return;
    }
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_URL}/get-location-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const { id, project_id, project_name, substation_name, attributes } =
    locationdata;
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
              Location Information
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
                className=" bg-[#6c63ff] hover:bg-[#5951e6] sm:w-auto w-full text-white px-5 py-2 rounded-md transition"
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
          <InfoItem label="Project Id" value={project_id} />
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
            <InfoItem label="Support Type" value={point_props.support_type} />
            <InfoItem
              label="Structure Type"
              value={point_props.structure_type}
            />
            <InfoItem label="Pole Type" value={point_props.pole_type} />
            <InfoItem label="Earthing Type" value={point_props.earthing_type} />
            <InfoItem label="Scheme" value={point_props.scheme} />

            <InfoItem label="Position" value={line_props.position} />
            <InfoItem label="Type" value={line_props.type} />
            <InfoItem
              label="Spare Line"
              value={line_props.has_spare_line ? "Yes" : "No"}
            />
          </SectionWithToggle>
        </div>
      </div>

      <div className="p-6 mt-5 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
        <h2 className="text-2xl font-bold text-[#6c63ff] mb-4">
          Maintenance Information
        </h2>

        <div className="pt-4">
          {selectedPoint?.id ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <InfoItem label="Device ID" value={selectedPoint.id} />

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveView("form")}
                    className="w-full sm:w-auto px-4 py-2 bg-[#6c63ff] hover:bg-[#5951e6] text-white rounded-lg shadow"
                  >
                    Add Record
                  </button>

                  <button
                    onClick={() => setActiveView("table")}
                    className="w-full sm:w-auto px-4 py-2 bg-[#6c63ff] hover:bg-[#5951e6] text-white rounded-lg shadow"
                  >
                    View Latest Records
                  </button>
                </div>
              </div>

              <div className="mt-6">
                {activeView === "form" && (
                  <MaitenanceForm
                    locationId={id}
                    deviceId={selectedPoint?.id}
                    projectId={project_id}
                  />
                )}

                {activeView === "table" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border mt-4">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border">Date</th>
                          <th className="px-4 py-2 border">Technician</th>
                          <th className="px-4 py-2 border">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 border">2025-04-08</td>
                          <td className="px-4 py-2 border">Yash</td>
                          <td className="px-4 py-2 border">
                            Replaced fuse, tested circuit.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 border">2025-04-01</td>
                          <td className="px-4 py-2 border">Ravi</td>
                          <td className="px-4 py-2 border">
                            Routine inspection, no issues.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500 mt-2">
              Please select the device or node first
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MaintenancePage;
