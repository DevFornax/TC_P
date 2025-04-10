import { useState } from "react";
import { InfoItem } from "../UI/InfoItem";
import { InspectionFields } from "../utils/InspectionFields";

const initialFormData = {};
InspectionFields.forEach((field) => {
  if (field.selectedOption) {
    initialFormData[field.name] = field.selectedOption;
  }
});

function VisualInspection({ locationdata, selection }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  
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

  InspectionFields
    .filter((field) => field.device.includes(selection)) 
    .forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = "This field is required";
      }
    });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const handleReset = () => {
    const resetData = {};
    InspectionFields.forEach((field) => {
      resetData[field.name] = field.selectedOption || ""; 
    });
    setFormData(resetData);
    setErrors({}); // clear errors too
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Form Data:", formData);
      alert("Inspection submitted!");
    } else {
      console.log("❌ Validation failed:", errors);
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <h2 className="text-2xl font-bold text-[#6c63ff] mb-4 sm:mb-0">
          Visual Inspection
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"></div>
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
                <div className="flex flex-wrap gap-3">
                  {field.options.map((option) => (
                    <label
                      key={option}
                      className="inline-flex  pt-2 items-center space-x-2"
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
                  value={
                    formData[field.name] !== undefined
                      ? formData[field.name]
                      : field.selectedOption || ""
                  }
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full   py-2 text-sm
                    border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c63ff]
                    
                    ${
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

        <div className="mt-6 justify-end col-span-full flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
  );
}

export default VisualInspection;
