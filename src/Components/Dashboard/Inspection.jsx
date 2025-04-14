import { useState, useEffect } from "react";
import { InfoItem } from "../UI/InfoItem";
import { InspectionFields } from "../utils/InspectionFields";
import { compressVisualData } from "../utils/VisualTemplateForVisualInspection";
const initialFormData = {};
InspectionFields.forEach((field) => {
  if (field.selectedOption) {
    initialFormData[field.name] = field.selectedOption;
  }
});

function Inspection({ locationdata, selection, deviceId, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [thermalEnabled, setThermalEnabled] = useState(false);
  const [thermalRecords, setThermalRecords] = useState([]);
  const [showCardOfInspection, setshowCardOfInspection] = useState(true);

  useEffect(() => {
    if (!thermalEnabled) return;
    if (deviceId?.id && deviceId?.condition) {
      setThermalRecords((prev) => {
        const index = prev.findIndex((r) => r.id === deviceId.id);

        if (deviceId.condition === "Normal") {
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

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.username) {
      setFormData((prev) => ({
        ...prev,
        username: userData.username,
      }));
    }
  }, []);

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      if (name === "inspectionDateDate" || name === "inspectionDateTime") {
        const date =
          name === "inspectionDateDate" ? value : prev.inspectionDateDate;
        const time =
          name === "inspectionDateTime" ? value : prev.inspectionDateTime;

        if (date && time) {
          updatedForm.inspectionDate = `${date}T${time}`;
        } else {
          updatedForm.inspectionDate = "";
        }
      }

      return updatedForm;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "inspectionDateDate" || name === "inspectionDateTime"
        ? { inspectionDate: "" }
        : {}),
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
    if (!formData.username || formData.username.trim() === "") {
      newErrors.username = "Username is required";
    }
    if (!formData.inspectionDateDate) {
      newErrors.inspectionDateDate = "Inspection date is required.";
    }

    if (!formData.inspectionDateTime) {
      newErrors.inspectionDateTime = "Inspection time is required.";
    }

   
    if (formData.inspectionDateDate && formData.inspectionDateTime) {
      const inspectionDateTime = `${formData.inspectionDateDate}T${formData.inspectionDateTime}`;
      if (!inspectionDateTime.includes("T")) {
        newErrors.inspectionDate =
          "Inspection date & time are required in valid format.";
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
    setThermalRecords([]);
    setThermalEnabled(false);
  };


  // console.log(selection);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (validate()) {
  //     const compressedVisual = compressVisualData(formData);

  //     const LocationID = locationdata?.id;
  //     const keysToAppendLocation = [
  //       "TDB",
  //       "TDU1",
  //       "TDR",
  //       "TDU3",
  //       "TDY",
  //       "TDN",
  //       "TDU2",
      
  //     ];
  //     let thermalInspection;

  //     const conditionMap = {
  //       Medium: "M",
  //       High: "H",
  //       Normal: "N",
  //     };

  //     if (thermalEnabled) {
  //       if (thermalRecords.length > 0) {
  //         thermalInspection = Object.fromEntries(
  //           thermalRecords.map((point) => {
  //             const key = keysToAppendLocation.includes(point.id)
  //               ? `${point.id}${LocationID}`
  //               : point.id;

  //             const shortCondition =
  //               conditionMap[point.condition] || point.condition;

  //             return [key, shortCondition];
  //           })
  //         );
  //       } else {
  //         alert("⚠️ Thermal inspection is enabled but no data selected.");
  //         return;
  //       }
  //     } else {
  //       thermalInspection = JSON.stringify({ status: "notdone" });
  //     }

  //     const minimalLocationData = {
  //       id: locationdata?.id,
  //       parent_id: locationdata?.parent_id,
  //       project_id: locationdata?.project_id,
  //       project_name: locationdata?.project_name,
  //       substation_id: locationdata?.substation_id,
  //       substation_name: locationdata?.substation_name,
  //       attributes: {
  //         point_type: locationdata?.attributes?.point_type,
  //         point_no: locationdata?.attributes?.point_no,
  //         area_code: locationdata?.attributes?.area_code,
  //         ulid: locationdata?.attributes?.ulid,
  //       },
  //     };
  //     const finalData = {
  //       username: formData.username,
  //       inspectionDate: formData.inspectionDate,
  //       locationdata: minimalLocationData,
  //       visualInspection: compressedVisual,
  //       thermalInspection,
  //     };

  //     console.log("✅ Final Submission Payload:", finalData);
  //     const token = localStorage.getItem("token");
  //     const API_URL = import.meta.env.VITE_API_BASE_URL;

  //     try {
  //       const response = await fetch(`${API_URL}/submit-inspection`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(finalData),
  //       });

  //       const result = await response.json();

  //       if (response.ok) {
  //         alert("Inspection submitted successfully!");
  //         console.log("Submission Result:", result);
  //         setThermalRecords([]);
  //         handleReset();
  //         onSubmit();
  //       } else {
  //         alert(`❌ Error: ${result.error}`);
  //         console.log("Error submitting inspection data:", result);
  //       }
  //     } catch (error) {
  //       console.error("Error submitting inspection data:", error);
  //       alert(
  //         "⚠️ An error occurred while submitting the data. Please try again."
  //       );
  //     }
  //   } else {
  //     console.log("❌ Validation failed:", errors);
  //   }
  // };console.log(selection); // Assuming this gives you the device type like "Transformer"

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    const selectedDevice = selection; // Get the selected device type

    // 🔥 Filter visible fields based on the selected device (like "Fuse", "Transformer", etc.)
    const filteredInspectionFields = InspectionFields.filter(
      (field) => field.device.includes(selectedDevice) // Ensure field.device includes the selected device type
    );

    const filteredFormData = {};
    filteredInspectionFields.forEach((field) => {
      // Include only the fields that have data in formData
      if (formData[field.name] !== undefined) {
        filteredFormData[field.name] = formData[field.name];
      }
    });

    // 👇 Compress only filtered (visible) data
    const compressedVisual = compressVisualData(filteredFormData);

    const LocationID = locationdata?.id;
    const keysToAppendLocation = [
      "TDB",
      "TDU1",
      "TDR",
      "TDU3",
      "TDY",
      "TDN",
      "TDU2",
    ];
    let thermalInspection;

    const conditionMap = {
      Medium: "M",
      High: "H",
      Normal: "N",
    };

    // Handle thermal inspection if it's enabled
    if (thermalEnabled) {
      if (thermalRecords.length > 0) {
        thermalInspection = Object.fromEntries(
          thermalRecords.map((point) => {
            const key = keysToAppendLocation.includes(point.id)
              ? `${point.id}${LocationID}`
              : point.id;

            const shortCondition =
              conditionMap[point.condition] || point.condition;

            return [key, shortCondition];
          })
        );
      } else {
        alert("⚠️ Thermal inspection is enabled but no data selected.");
        return;
      }
    } else {
      thermalInspection = JSON.stringify({ status: "notdone" });
    }

    // Minimal location data for submission
    const minimalLocationData = {
      id: locationdata?.id,
      parent_id: locationdata?.parent_id,
      project_id: locationdata?.project_id,
      project_name: locationdata?.project_name,
      substation_id: locationdata?.substation_id,
      substation_name: locationdata?.substation_name,
      attributes: {
        point_type: locationdata?.attributes?.point_type,
        point_no: locationdata?.attributes?.point_no,
        area_code: locationdata?.attributes?.area_code,
        ulid: locationdata?.attributes?.ulid,
      },
    };

    // Final data to send to the API
    const finalData = {
      username: formData.username,
      inspectionDate: formData.inspectionDate,
      locationdata: minimalLocationData,
      visualInspection: compressedVisual,
      thermalInspection,
    };

    console.log("✅ Final Submission Payload:", finalData);

    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      // Submit the inspection data to the backend
      const response = await fetch(`${API_URL}/submit-inspection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Inspection submitted successfully!");
        console.log("Submission Result:", result);
        setThermalRecords([]);
        handleReset();
        onSubmit();
      } else {
        alert(`❌ Error: ${result.error}`);
        console.log("Error submitting inspection data:", result);
      }
    } catch (error) {
      console.error("Error submitting inspection data:", error);
      alert(
        "⚠️ An error occurred while submitting the data. Please try again."
      );
    }
  } else {
    console.log("❌ Validation failed:", errors);
  }
};


  if (!locationdata)
    return (
      <div>
        <div className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            <h2 className="text-2xl font-bold text-[#6c63ff] mb-4 sm:mb-0">
              Visual & Thermal Inspection
            </h2>
          </div>
          <p className="text-gray-500 text-center font-semibold">
            Please enter a valid Location ID to submit the visual and thermal
            inspection report.
          </p>
          
        </div>
      </div>
    );
  const {
    id,
    project_id,
    project_name,
    substation_name,
    attributes = {},
  } = locationdata;
  const { point_type, point_no, area_code } = attributes;

  return (
    <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-in-out">
      <div
        onClick={() => setshowCardOfInspection(!showCardOfInspection)}
        className="cursor-pointer bg-[#6c63ff] text-white px-6 py-3 flex justify-between items-center text-lg font-semibold"
      >
        <span>Inspection Records</span>
        <span>{showCardOfInspection ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          setshowCardOfInspection
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 h-0"
        } origin-top transform`}
      >
        {showCardOfInspection && (
          <div className="p-6 rounded-xl shadow-lg bg-white space-y-6">
            <form onSubmit={handleSubmit}>
              <div className=" shadow ">
                <label className="block font-bold mb-1">
                  Visual Inspection Records
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inspected By
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username || ""}
                      onChange={(e) => handleChange("username", e.target.value)}
                      className={`w-full py-2 px-3 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff] ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
               
                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inspected Date
                    </label>
                    <input
                      type="date"
                      name="inspectionDateDate"
                      value={formData.inspectionDateDate || ""}
                      onChange={(e) =>
                        handleChange("inspectionDateDate", e.target.value)
                      }
                      className={`w-full py-2 px-3 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff] ${
                        errors.inspectionDateDate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.inspectionDateDate && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.inspectionDateDate}
                      </p>
                    )}
                  </div>

                  <div className="border p-4 rounded-xl shadow bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inspected On
                    </label>
                    <input
                      type="time"
                      name="inspectionDateTime"
                      value={formData.inspectionDateTime || ""}
                      onChange={(e) =>
                        handleChange("inspectionDateTime", e.target.value)
                      }
                      className={`w-full py-2 px-3 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff] ${
                        errors.inspectionDateTime
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.inspectionDateTime && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.inspectionDateTime}
                      </p>
                    )}
                  </div>

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
                                onChange={() =>
                                  handleChange(field.name, option)
                                }
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
                          onChange={(e) =>
                            handleChange(field.name, e.target.value)
                          }
                          className={`w-full py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff] ${
                            errors[field.name]
                              ? "border-red-500"
                              : "border-gray-300"
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
              </div>

              <div className=" mt-6 p-6 pl-0 rounded-xl bg-white shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Thermal Inspection Records
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thermal Inspection Done?
                    </label>
                    <select
                      name="thermalInspection"
                      value={thermalEnabled ? "yes" : "no"}
                      onChange={(e) =>
                        setThermalEnabled(e.target.value === "yes")
                      }
                      className={`w-full py-2 px-3 border rounded-lg shadow-sm text-sm focus:outline-none ${
                        errors.thermal ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                    {errors.thermal && (
                      <p className="text-red-500 text-xs mt-2">
                        {errors.thermal}
                      </p>
                    )}
                  </div>
                </div>

                {thermalEnabled && thermalRecords.length > 0 && (
                  <div className="mt-6 border-t pt-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-2">
                      Recorded Points
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {thermalRecords.length > 0 ? (
                        thermalRecords.map((record, idx) => (
                          <li
                            key={idx}
                            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
                          >
                            <span className="font-medium">ID:</span> {record.id}{" "}
                            <span className="ml-4 font-medium">Condition:</span>{" "}
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                record.condition === "High"
                                  ? "bg-red-100 text-red-600"
                                  : record.condition === "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {record.condition}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">
                          No thermal records found.
                        </li>
                      )}
                    </ul>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setThermalRecords([])}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow"
                      >
                        🧹 Clear Thermal Records
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-2 rounded transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 text-white `}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Inspection;
