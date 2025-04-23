import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { visualTemplate } from "../utils/VisualTemplateforVisualFields";

const RightSidebar = ({
  RightsidebarOpen,
  setRightSidebarOpen,
  selectedLocation,
  action,
}) => {
  const initialWidth = 300;
  const maxWidth = 900;
  const minWidth = 250;
  const [width, setWidth] = useState(initialWidth);
  const [inspectionData, setInspectionData] = useState(null);

  useEffect(() => {
    const fetchInspectionData = async () => {
      if (!selectedLocation) return;
      try {
        const res = await axios.post("/get-latest-inspection-signledata", {
          location_id: selectedLocation,
        });
        setInspectionData(res.data);
      } catch (err) {
        console.error("Error fetching inspection data:", err);
      }
    };

    fetchInspectionData();
  }, [selectedLocation]);

  useEffect(() => {
    const handleResize = () => {
      console.log("Current sidebar width:", width);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const handleCloseSidebar = () => setRightSidebarOpen(false);
  const increaseWidth = () => {
    if (width < maxWidth) {
      setWidth((prev) => prev + 100);
    }
  };

  const decreaseWidth = () => {
    if (width > minWidth) {
      setWidth((prev) => prev - 100);
    }
  };

  const getGridColsSingleRecordHeader = () => {
    if (width >= 700) {
      return "grid-cols-3";
    } else if (width >= 500) {
      return "grid-cols-2";
    } else {
      return "grid-cols-1";
    }
  };
  const getGridColsVisualInspection = () => {
    if (width >= 700) {
      return "grid-cols-3";
    } else if (width >= 500) {
      return "grid-cols-2";
    } else {
      return "grid-cols-1";
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 mt-16    z-[999] transform transition-transform duration-300 ease-in-out overflow-y-auto max-h-full shadow-lg ${
        RightsidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: `${width}px`, backgroundColor: "#d9e4ec" }}
    >
      <div className="flex justify-between items-center p-4 border-b border-[#b7cfdc]">
        <div className="font-bold text-lg text-[#385e72]">{action}</div>
        <button
          onClick={handleCloseSidebar}
          className="text-xl font-bold text-[#385e72] hover:text-[#6aabd2] transition"
        >
          &times;
        </button>
      </div>

      {action === "Latest Inspectin Data" &&
        (inspectionData && Object.keys(inspectionData).length > 0 ? (
          <div
            className="p-4 text-sm text-[#385e72] space-y-4"
            style={{ height: `calc(100vh - 4rem - 64px)`, overflowY: "auto" }}
          >
            <div className="bg-white shadow rounded-lg p-4 border border-[#b7cfdc]">
              <h2 className="text-base font-bold mb-2">General Information</h2>
              <hr className="border-t border-[#385e72] mt-2 mb-4" />
              <div
                className={`grid ${getGridColsSingleRecordHeader()} gap-x-6 gap-y-3`}
              >
                <p>
                  <span className="font-semibold">Inspection ID:</span>{" "}
                  {inspectionData.inspection_id}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(inspectionData.inspection_date).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Done By:</span>{" "}
                  {inspectionData.inspection_done_by}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {inspectionData.location_type}
                </p>
                <p>
                  <span className="font-semibold">Location ID:</span>{" "}
                  {inspectionData.location_id}
                </p>
                <p>
                  <span className="font-semibold">Location Name:</span>{" "}
                  {inspectionData.location_name}
                </p>
                <p>
                  <span className="font-semibold">Project ID:</span>{" "}
                  {inspectionData.project_id}
                </p>
                <p>
                  <span className="font-semibold">Action Required:</span>{" "}
                  {inspectionData.actionrequired}
                </p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 border border-[#b7cfdc]">
              <h2 className="text-base font-bold mb-2">Visual Inspection</h2>
              <hr className="border-t border-[#385e72] mt-2 mb-4" />
              <div
                className={` grid gap-x-6 gap-y-3 ${getGridColsVisualInspection(
                  width
                )}`}
              >
                {Object.entries(inspectionData.visual_inspection).map(
                  ([key, value], index) => {
                    const visualItem = visualTemplate[key];
                    const optionName = visualItem?.options[value];

                    const displayValue = (() => {
                      if (optionName === "NI" || optionName === "ni") {
                        return "Not Identified";
                      }
                      if (optionName === "NA" || optionName === "na") {
                        return "Not Available";
                      }
                      return optionName || "N/A";
                    })();

                    return (
                      <p className="" key={index}>
                        <span className="font-semibold">
                          {visualItem?.name.replace(/_/g, " ").toUpperCase()}
                        </span>
                        : {displayValue}
                      </p>
                    );
                  }
                )}
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 border border-[#b7cfdc]">
              <h2 className="text-base font-bold mb-2">Thermal Inspection</h2>
              <hr className="border-t border-[#6aabd2] my-4" />
              <div
                className={`grid gap-x-6 gap-y-3 ${getGridColsVisualInspection(
                  width
                )}`}
              >
                {Object.entries(inspectionData.thermal_inspection).map(
                  ([key, value]) => (
                    <div key={key} className="space-y-1">
                      <p>
                        <span className="font-semibold">{key} </span>:
                        {value === "H"
                          ? "High"
                          : value === "M"
                          ? "Medium"
                          : value}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="p-4 text-sm text-[#385e72] h-full space-y-4"
            style={{ height: `calc(100vh - 4rem - 64px)`, overflowY: "auto" }}
          >
            <p>There is no data available for this inspection.</p>
          </div>
        ))}

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2">
        <div
          onClick={increaseWidth}
          className={`bg-[#6aabd2] hover:bg-[#385e72] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md transition ${
            width >= maxWidth ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ zIndex: 1000 }}
          title="Increase width"
        >
          +
        </div>

        <div
          onClick={decreaseWidth}
          className={`bg-[#d9534f] hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md transition ${
            width <= initialWidth ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ zIndex: 1000 }}
          title="Decrease width"
        >
          -
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
