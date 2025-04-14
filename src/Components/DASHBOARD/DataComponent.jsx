
import React, { useEffect, useState } from "react";
import { visualTemplate } from "../utils/VisualTemplateforVisualFields";
import { useNavigate } from "react-router-dom";
export default function DataComponent() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [activeRow, setActiveRow] = useState(null);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_BASE_URL;



const navigate = useNavigate(); 

const handleDownloadPDF = (item) => {
  navigate("/generate-pdf", { state: { inspectionData: item } });
};
  



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/get-inspection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          page,
          limit,
          filter,
        }),
      });

      const result = await response.json();
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, filter]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleRowClick = (inspection_id) => {
    setActiveRow((prevRow) =>
      prevRow === inspection_id ? null : inspection_id
    );
  };

  const getVisualInspectionStatus = (visualData) => {
    return Object.entries(visualTemplate).map(([key, { name, options }]) => {
      const value = visualData[key];
      const optionName = options[value] || "Unknown";
      return (
        <p key={key}>
          {name}: {optionName}
        </p>
      );
    });
  };

  // Handle the Thermal Inspection Status
  const getThermalInspectionStatus = (thermalData) => {
    if (typeof thermalData === "string") {
      // If the thermalData is a string, it could be a simple status like `{"status": "notdone"}`
      const parsedData = JSON.parse(thermalData);
      return <p>Status: {parsedData.status || "Unknown"}</p>;
    } else if (typeof thermalData === "object") {
      // If it's an object, we expect it to be device-specific with their statuses
      return Object.entries(thermalData).map(([deviceId, status]) => (
        <p key={deviceId}>
          {deviceId}: {status}
        </p>
      ));
    } else {
      return <p>Unknown thermal data format</p>;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded"
            placeholder="Search..."
            value={filter}
            onChange={handleFilterChange}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={3}>3</option>
            <option value={12}>12</option>
            <option value={50}>50</option>
          </select>
        </div>
        <p>{`Showing ${data.length} of ${total} records`}</p>
      </div>

  
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Inspection ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Visual Inspection</th>
              <th className="px-4 py-2 text-left">Thermal Inspection</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.inspection_id}>
                  <td className="px-4 py-2">{item.inspection_id}</td>
                  <td className="px-4 py-2">{item.inspection_date}</td>
                  <td className="px-4 py-2">{item.location_id}</td>
                  <td className="px-4 py-2">
                    {getVisualInspectionStatus(item.visual_inspection)}
                  </td>
                  <td className="px-4 py-2">
                    {getThermalInspectionStatus(item.thermal_inspection)}
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500">View</button>
                    <button className="text-red-500 ml-2">Delete</button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-500"
                      onClick={() => handleRowClick(item.inspection_id)}
                    >
                      View
                    </button>
                    <button className="text-red-500 ml-2">Delete</button>
                    <button
                      className="text-green-500 ml-2"
                      onClick={() => handleDownloadPDF(item)} 
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {[...Array(Math.ceil(total / limit))].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          disabled={page === Math.ceil(total / limit)}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
