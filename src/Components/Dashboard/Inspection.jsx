// import { useState } from "react";
// import { InfoItem } from "../UI/InfoItem";
// import { InspectionFields } from "../utils/InspectionFields";

// const initialFormData = {};
// InspectionFields.forEach((field) => {
//   if (field.selectedOption) {
//     initialFormData[field.name] = field.selectedOption;
//   }
// });

// function Inspection({ locationdata, selection }) {
//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});
  
//   if (!locationdata) return null;
//   const {
//     id,
//     project_id,
//     project_name,
//     substation_name,
//     attributes = {},
//   } = locationdata;
//   const { point_type, point_no, area_code } = attributes;

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//  const validate = () => {
//   const newErrors = {};

//   InspectionFields
//     .filter((field) => field.device.includes(selection)) 
//     .forEach((field) => {
//       if (!formData[field.name]) {
//         newErrors[field.name] = "This field is required";
//       }
//     });

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };
//   const handleReset = () => {
//     const resetData = {};
//     InspectionFields.forEach((field) => {
//       resetData[field.name] = field.selectedOption || ""; 
//     });
//     setFormData(resetData);
//     setErrors({}); // clear errors too
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log("✅ Form Data:", formData);
//       alert("Inspection submitted!");
//     } else {
//       console.log("❌ Validation failed:", errors);
//     }
//   };

//   return (
//     <div className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
//         <h2 className="text-2xl font-bold text-[#6c63ff] mb-4 sm:mb-0">
//           Visual & Thermal Inspection
//         </h2>
//         <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"></div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//         <InfoItem label="Location ID" value={id} />
//         <InfoItem label="Device Type" value={selection} />
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {InspectionFields.filter((field) =>
//             field.device.includes(selection)
//           ).map((field) => (
//             <div
//               key={field.name}
//               className="border p-4 rounded-xl shadow bg-white"
//             >
//               <InfoItem label={field.label} value={""} />
//               {field.type === "radio" ? (
//                 <div className="flex flex-wrap gap-3">
//                   {field.options.map((option) => (
//                     <label
//                       key={option}
//                       className="inline-flex  pt-2 items-center space-x-2"
//                     >
//                       <input
//                         type="radio"
//                         name={field.name}
//                         value={option}
//                         checked={formData[field.name] === option}
//                         onChange={() => handleChange(field.name, option)}
//                         className="form-radio text-indigo-600"
//                       />
//                       <span className="text-sm">{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <select
//                   name={field.name}
//                   value={
//                     formData[field.name] !== undefined
//                       ? formData[field.name]
//                       : field.selectedOption || ""
//                   }
//                   onChange={(e) => handleChange(field.name, e.target.value)}
//                   className={`w-full   py-2 text-sm
//                     border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]
                    
//                     ${
//                       errors[field.name] ? "border-red-500" : "border-gray-300"
//                     }`}
//                 >
//                   <option value="">Select</option>
//                   {field.options.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {errors[field.name] && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors[field.name]}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 justify-end col-span-full flex flex-col sm:flex-row gap-2 sm:justify-end">
//           <button
//             type="submit"
//             className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Submit Inspection
//           </button>

//           <button
//             type="button"
//             onClick={handleReset}
//             className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-gray-100 rounded hover:bg-gray-400"
//           >
//             Reset
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Inspection;








import { useState, useEffect } from "react";
import { InfoItem } from "../UI/InfoItem";
import { InspectionFields } from "../utils/InspectionFields";

const initialFormData = {};
InspectionFields.forEach((field) => { 
  if (field.selectedOption) {
    initialFormData[field.name] = field.selectedOption;
  }
});

function Inspection({ locationdata, selection, deviceId }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [thermalEnabled, setThermalEnabled] = useState(false); 
const [selectedThermalPoint, setSelectedThermalPoint] = useState(null);
const [selectedThermalPoints, setSelectedThermalPoints] = useState([]);

const togglePoint = (id) => {
  setSelectedThermalPoints((prev) =>
    prev.includes(id) ? prev.filter((point) => point !== id) : [...prev, id]
  );
};

const resetPoints = () => {
  setSelectedThermalPoints([]);
};



useEffect(() => {
  setSelectedThermalPoint(null);
  if (!deviceId?.startsWith("TD") && selectedThermalPoints.length > 0) {
    resetPoints(); 
  }
}, [deviceId]);

  if (!locationdata) return null;

  const {
    id,
    project_id,
    project_name,
    substation_name,
    attributes = {},
  } = locationdata;
  const { point_type, point_no, area_code } = attributes;

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  

  const validate = () => {
    const newErrors = {};

   
    InspectionFields.filter((field) =>
      field.device.includes(selection)
    ).forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = "This field is required";
      }
    });

    if (thermalEnabled) {
      if (deviceId?.startsWith("TD")) {
        if (selectedThermalPoints.length === 0) {
          newErrors.thermalScanPoints =
            "Please select at least one thermal point.";
        }
      } else {
        if (!deviceId) {
          newErrors.thermalScanPoints =
            "Device ID is required for thermal scan.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    const resetData = {};
    InspectionFields.forEach((field) => {
      resetData[field.name] = field.selectedOption || "";
    });
    setFormData(resetData);
    setErrors({});
    setThermalEnabled(false); 
  };

  

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    let thermalData = [];

    if (thermalEnabled) {
      if (deviceId?.startsWith("TD")) {
        thermalData = selectedThermalPoints.map((pt) => `${pt}${deviceId}`);
      } else {
        thermalData = [deviceId]; 
      }
    }

    const finalData = {
      ...formData,
      thermalScanPoints: thermalData,
      deviceId,
      locationdata
    };

    console.log("✅ Final Submission Payload:", finalData);
    alert("Inspection submitted!");
 handleReset()
  } else {
    console.log("❌ Validation failed:", errors);
  }
};



  return (
    <div className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <h2 className="text-2xl font-bold text-[#6c63ff] mb-4 sm:mb-0">
          Visual & Thermal Inspection
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <InfoItem label="Location ID" value={id} />
        <InfoItem label="Device Type" value={selection} />
      </div>

    
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {InspectionFields.filter((field) =>
            field.device.includes(selection)
          ).map((field) => (
            <div
              key={field.name}
              className="border p-4 rounded-xl shadow bg-white"
            >
              <InfoItem label={field.label} value={""} />
              {field.type === "radio" ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  {field.options.map((option) => (
                    <label
                      key={option}
                      className="inline-flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={formData[field.name] === option}
                        onChange={() => handleChange(field.name, option)}
                        className="form-radio text-indigo-600"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff] ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
        
          <button
            type="submit"
            disabled={
              thermalEnabled &&
              deviceId?.startsWith("TD") &&
              selectedThermalPoints.length === 0
            }
            className={`w-full sm:w-auto px-6 py-2 rounded transition-all duration-200 ${
              thermalEnabled &&
              deviceId?.startsWith("TD") &&
              selectedThermalPoints.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Submit Inspection
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-gray-100 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-6 border-t pt-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">
          Thermal Inspection Done?
        </span>
        <button
          onClick={() => setThermalEnabled(!thermalEnabled)}
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            thermalEnabled
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {thermalEnabled ? "Yes" : "No"}
        </button>
      </div>

      {thermalEnabled && (
        <div className="mt-6 border rounded-xl bg-gray-50 p-6 shadow-inner">
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">
            🔥 Thermal Inspection Section
          </h3>

          <p className="text-sm text-gray-700 mb-4">
            Please select the device to add the Thermal Report.
          </p>

          <p className="text-sm font-medium text-gray-600">
            Device ID: {deviceId || "Not selected"}
          </p>

          {deviceId?.startsWith("TD") && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <svg width="400" height="450" viewBox="0 0 400 250">
                {/* Main Transformer Shape */}
                <polygon
                  points="120,50 310,50 250,190 50,190"
                  fill="#e0e7ff"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />
                <rect
                  x="50"
                  y="190"
                  width="200"
                  height="140"
                  fill="white"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />
                <text
                  x="150"
                  y="260"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#1f2937"
                  fontWeight="bold"
                >
                  Transformer
                </text>
                <line
                  x1="310"
                  y1="50"
                  x2="310"
                  y2="190"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />
                <line
                  x1="250"
                  y1="330"
                  x2="310"
                  y2="190"
                  stroke="#4f46e5"
                  strokeWidth="2"
                />

                {/* Top Circles V1, V2, V3 */}
                {["V1", "V2", "V3"].map((id, idx) => (
                  <g key={id}>
                    <circle
                      cx={140 + idx * 55}
                      cy={75}
                      r={10}
                      fill={
                        selectedThermalPoints.includes(id)
                          ? "#ef4444"
                          : "#6c63ff"
                      }
                      className="cursor-pointer transition hover:fill-pink-500"
                      onClick={() => togglePoint(id)}
                    />
                    <text
                      x={140 + idx * 55}
                      y={94}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#1f2937"
                    >
                      {id}
                    </text>
                  </g>
                ))}

                {/* Bottom Phase Circles N, R, Y, B */}
                {["N", "R", "Y", "B"].map((id, idx) => {
                  const phaseColors = {
                    N: "#000000",
                    R: "#ff0000",
                    Y: "#ffff00",
                    B: "#0000ff",
                  };
                  const selectedColor = selectedThermalPoints.includes(id)
                    ? "#ef4444"
                    : phaseColors[id];

                  return (
                    <g key={id}>
                      <circle
                        cx={100 + idx * 42}
                        cy={145}
                        r={10}
                        fill={selectedColor}
                        className="cursor-pointer transition hover:fill-pink-500"
                        onClick={() => togglePoint(id)}
                      />
                      <text
                        x={100 + idx * 42}
                        y={165}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#1f2937"
                      >
                        {id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {selectedThermalPoints.length > 0 && (
                <div className="text-sm mt-4 font-semibold text-indigo-700 text-center space-y-2">
                  <div>
                    🔎{" "}
                    <span className="text-gray-700">
                      Selected Thermal Points:
                    </span>{" "}
                    <span className="text-gray-800">
                      {selectedThermalPoints
                        .map((pt) => `${pt}${deviceId}`)
                        .join(", ")}
                    </span>
                  </div>

                  <button
                    onClick={resetPoints}
                    className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                  >
                    Reset
                  </button>
                </div>
              )}
              {errors.thermalScanPoints && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {errors.thermalScanPoints}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Inspection;
