import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LeftSidebar = ({
  LeftsidebarOpen,
  onLocationDataFetched,
  oninspectionDataBasedOnActionRequiredFetched,
  locationIdFromMaptoLeftsidebar,
}) => {

const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("search");
  const [id, setId] = useState("");
  const [method, setMethod] = useState("project");
  const [loading, setLoading] = useState(false);
  const [inspectionLoading, setInspectionLoading] = useState(false);
  const [locationInfo, setLocationInfo] = useState(null);

  useEffect(() => {
    const fetchLocationInfo = async () => {
      if (locationIdFromMaptoLeftsidebar) {
        try {
          const response = await axios.post(
            "/get-location-data",
            {
              location_id: locationIdFromMaptoLeftsidebar,
            }
          );
          setLocationInfo(response.data);
        } catch (err) {
          console.error("❌ Error fetching location info:", err);
        }
      }
    };

    fetchLocationInfo();
  }, [locationIdFromMaptoLeftsidebar]);

  const handleSearch = async () => {
    if (!id.trim()) {
      alert("Please enter a valid ID.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/get-project-data", {
        id,
        method,
      });

      onLocationDataFetched(data.locations || []);

      await handleInspectionFetch(id, method);
      setId("");
      setMethod("project");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleInspectionFetch = async (id, method) => {
    setInspectionLoading(true);
    try {
      const { data } = await axios.post("/get-latestdata-actionreq", {
        id,
        method,
      });

      if (oninspectionDataBasedOnActionRequiredFetched) {
        oninspectionDataBasedOnActionRequiredFetched(data);
      }
    } catch (err) {
      console.error(
        "❌ Inspection Fetch Error:",
        err.response?.data || err.message
      );
      alert(err?.response?.data?.error || "Error fetching inspection data.");
    } finally {
      setInspectionLoading(false);
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
            title="Find Location"
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
            title="View Location Info"
            onClick={() => setActiveSection("info")}
            className={`hover:text-yellow-300 transition ${
              activeSection === "info"
                ? "bg-white text-[#385e72] p-2 rounded"
                : ""
            }`}
          >
            ℹ️
          </button>
          <button
            title="Go to Data dashboard"
            onClick={() => navigate("/data-dashboard")}
            className={`hover:text-yellow-300 transition ${
              activeSection === "map-view"
                ? "bg-white text-[#385e72] p-2 rounded"
                : ""
            }`}
          >
            🗺️
          </button>
          <button
            title="Go to Inspection model"
            onClick={() => navigate("/inspection")}
            className={`hover:text-yellow-300 transition ${
              activeSection === "inspection"
                ? "bg-white text-[#385e72] p-2 rounded"
                : ""
            }`}
          >
            🛠️
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

        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === "search" && (
            <div className="px-3 py-3">
              <h2 className="text-lg font-bold text-[#385e72] mb-4">Search</h2>
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
                Settings
              </h2>
              <p className="text-sm text-gray-600">
                More content coming soon...
              </p>
            </div>
          )}

          {activeSection === "info" ? (
            locationInfo ? (
              <div className="px-3 py-3">
                <h2 className="text-lg font-bold text-[#385e72] mb-4">
                  Location Info
                </h2>

                <div className="bg-[#d9e4ec] rounded-lg ">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Location Id
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.id}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Location Type
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.attributes.point_type}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Location Name
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.location_name || "NA"}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Project Id
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.project_id}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Project Name
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.project_name}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />{" "}
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Substation id
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.substation_id}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />{" "}
                    <div className="space-y-2">
                      <p className="text-sm text-[#385e72] font-medium">
                        Substation Name
                      </p>
                      <p className="text-sm text-[#6aabd2]">
                        {locationInfo.substation_name}
                      </p>
                    </div>
                    <hr className="border-t border-[#6aabd2] my-4" />{" "}
                    <div className="flex justify-center">
                      <a
                        href={`https://www.google.com/maps?q=${locationInfo.attributes.lat},${locationInfo.attributes.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="bg-[#385e72] text-white py-2 px-4 rounded hover:bg-[#6aabd2] transition">
                          View on Map
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">Please Select the Location first</p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
