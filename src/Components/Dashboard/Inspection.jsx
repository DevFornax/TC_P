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
  const [thermalRecords, setThermalRecords] = useState([]);

  useEffect(() => {
    if (!thermalEnabled) return;
    if (deviceId?.id && deviceId?.condition) {
      setThermalRecords((prev) => {
        const index = prev.findIndex((r) => r.id === deviceId.id);

        if (deviceId.condition === "none") {
          if (index !== -1) {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
          }
          return prev;
        }

        if (index !== -1) {
          if (prev[index].condition !== deviceId.condition) {
            const updated = [...prev];
            updated[index] = { id: deviceId.id, condition: deviceId.condition };
            return updated;
          }
          return prev;
        }

        return [...prev, { id: deviceId.id, condition: deviceId.condition }];
      });
    }
  }, [deviceId, thermalEnabled]);

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

    if (thermalEnabled && thermalRecords.length === 0) {
      newErrors.thermal = "Please inspect at least one thermal point";
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
    setThermalRecords([]); 
    setThermalEnabled(false); 
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const visualKeys = [
        "bus_bar",
        "busbar_do_jumper",
        "ug_cable_jumper",
        "tc_condition",
        "bird_guard",
        "do_tc_jumper",
        "ht_booting",
        "lt_booting",
        "breather_installed",
        "silica_gel_color",
        "oil_leakage",
        "oil_level",
        "tc_fencing",
        "fuse_box_external",
        "fuse_box_internal_burn",
        "lt_cable_connection",
      ];

      const visualInspection = {};
      visualKeys.forEach((key) => {
        if (formData[key] !== undefined) {
          visualInspection[key] = formData[key];
        }
      });

      const LocationID = locationdata?.id;
      const keysToAppendLocation = ["TDB", "TDV2", "TDR", "TDV3", "TDY", "TDN"];
      let thermalInspection;
      if (thermalEnabled) {
        if (thermalRecords.length > 0) {
          thermalInspection = Object.fromEntries(
            thermalRecords.map((point) => {
              const key = keysToAppendLocation.includes(point.id)
                ? `${point.id}${LocationID}`
                : point.id;

              return [key, point.condition];
            })
          );
        } else {
          alert("⚠️ Thermal inspection is enabled but no data selected.");
          return;
        }
      } else {
        thermalInspection = "notdone";
      }

      const finalData = {
        locationdata: locationdata,
        visualInspection,
        thermalInspection,
      };
      console.log("✅ Final Submission Payload:", finalData);    setThermalRecords([]); 
      alert("Inspection submitted successfully!");
      handleReset();
      
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
      <h3>Device ID: {deviceId?.id}</h3>
      <h4>Condition: {deviceId?.condition}</h4>
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
            className={`w-full sm:w-auto px-6 py-2 rounded transition-all duration-200 ${
              thermalEnabled && deviceId?.id.startsWith("TD")
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
        {errors.thermal && (
          <p className="text-red-500 text-xs mt-1">{errors.thermal}</p>
        )}
      </div>
      {thermalEnabled && thermalRecords.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2 text-gray-700">Thermal Records</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {thermalRecords.map((record, idx) => (
              <li key={idx}>
                <strong>ID:</strong> {record.id} | <strong>Condition:</strong>{" "}
                {record.condition}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setThermalRecords([])}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow"
          >
            🧹 Clear Thermal Records
          </button>
        </div>
      )}
    </div>
  );
}

export default Inspection;
