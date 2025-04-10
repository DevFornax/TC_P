import React, { useState } from "react";
import { InfoItem } from "../UI/InfoItem";
import { SectionWithToggle } from "../UI/SectionwithToggle";
import LocationInfoCard from "./LocationInfoCard";
import MaitenanceForm from "../MaitenanceForm";

function Dashboard({
  locationdata,
  selectedPoint,
  setLocationData,
  setLocationIDforchild,
  selection,
  setSelection,
}) {
  const [newLocationID, setNewLocationID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState(null);


  // const updateSelection = (newSelection) => {
  //   navigate(".", {
  //     replace: true,
  //     state: { ...location.state, selection: newSelection },
  //   });
  // };

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
      console.log("Api called from dashbpard")
    } catch (err) {
      console.error("Error fetching new location:", err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="p-6 mb-5 border border-gray-300 rounded-xl shadow-lg bg-white">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col">
            <label className="block font-bold mb-1">Location ID</label>
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

      <LocationInfoCard locationdata={locationdata} />
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

export default Dashboard;
