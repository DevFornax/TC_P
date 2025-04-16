import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LocationSearchFormCard from "./LocationSearchFormCard";
import DynamicSld from "./sld-survey/DynamicSLD";
import LocationInfoCard from "./LocationInfoCard";
import MaitenanceForm from "./MaitenanceForm";
import TopBar from "../Topbar";
import Inspection from "./Inspection";
import axios from "../utils/axiosInstance"; 

function SurveyDashboard() {
  const sldRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [newLocationID, setNewLocationID] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [selectedPoint, setselectedPoint] = useState(null);
  const [locationIDforchild, setLocationIDforchild] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [showGoToSld, setShowGoToSld] = useState(false);
  const [selection, setSelection] = useState("Transformer");
  const [inspectionSubmitted, setInspectionSubmitted] = useState(false);

  const handleInspectionSubmit = () => {
    setInspectionSubmitted(true);
  };

  useEffect(() => {
    if (inspectionSubmitted) {
      setLocationData(null);
      setselectedPoint(null);
      setSelection("Transformer");
      setInspectionSubmitted(false);
    }
  }, [inspectionSubmitted]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowGoToSld(true);
      } else {
        setShowGoToSld(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//   const handleLocationSearch = async () => {
//     if (!newLocationID || isNaN(newLocationID)) {
//       setError("Location ID must be a valid number.");

//       setTimeout(() => {
//         setError(null);
//       }, 5000);

//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
     
// const token = getAuthToken();
//       const res = await fetch(`${API_URL}/get-location-data`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ location_id: parseInt(newLocationID) }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.message || "Location not found");
//         return;
//       }
//       setLocationData(data);
//       setSelection(data.attributes.point_type);

//       setProjectId(data.project_id);
//       setLocationIDforchild(parseInt(newLocationID));
//       console.log("Api called from dashbpard");
//     } catch (err) {
//       console.error("Error fetching new location:", err);
//       setError("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };


const handleLocationSearch = async () => {
  if (!newLocationID || isNaN(newLocationID)) {
    setError("Location ID must be a valid number.");
    setTimeout(() => setError(null), 5000);
    return;
  }

  setError("");
  setLoading(true);

  try {
    const res = await axios.post("/get-location-data", {
      location_id: parseInt(newLocationID),
    });

    const data = res.data;

    setLocationData(data);
    setSelection(data.attributes.point_type);
    setProjectId(data.project_id);
    setLocationIDforchild(parseInt(newLocationID));
    console.log("API called from dashboard");
  } catch (err) {
    console.error("Error fetching new location:", err);
    const errorMsg = err.response?.data?.message || "Something went wrong!";
    setError(errorMsg);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <TopBar />
      {showGoToSld && (
        <div className="lg:hidden fixed bottom-5 right-5 z-50">
          <button
            onClick={() => {
              sldRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="w-12 h-12 bg-[#385e72] hover:bg-[#385e72] text-white rounded-full shadow-lg flex items-center justify-center transition duration-300 ease-in-out"
            aria-label="Scroll to SLD"
          >
            ↑
          </button>
        </div>
      )}

      <div className="container-fluid mx-auto p-3 mt-14">
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div
            ref={sldRef}
            className="w-full bg-white md:w-1/3 flex flex-col md:max-h-[calc(100vh-100px)] md:sticky md:top-4 overflow-auto border border-gray-300 rounded-xl shadow-lg"
          >
            <DynamicSld
              locationData={locationData}
              setLocationData={setLocationData}
              locationID={locationIDforchild}
              selection={selection}
              setSelection={setSelection}
              setSelectedPoint={setselectedPoint}
            />
          </div>

          <div className="flex-1 space-y-6">
            <LocationSearchFormCard
              newLocationID={newLocationID}
              setNewLocationID={setNewLocationID}
              selection={selection}
              setSelection={setSelection}
              handleLocationSearch={handleLocationSearch}
              loading={loading}
              error={error}
            />

            <LocationInfoCard locationdata={locationData} />

            <Inspection
              locationdata={inspectionSubmitted ? null : locationData}
              selection={inspectionSubmitted ? "select" : selection}
              deviceId={inspectionSubmitted ? null : selectedPoint}
              onSubmit={handleInspectionSubmit}
            />

            <MaitenanceForm
              locationId={locationIDforchild}
              deviceId={selectedPoint}
              projectId={projectId}
              locationdata={inspectionSubmitted ? null : locationData}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SurveyDashboard;
