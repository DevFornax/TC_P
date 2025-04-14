




import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import TcSldPrint from "./TcSldPrint";

pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  TimesNewRoman: {
    normal: "TimesNewRoman-Regular.ttf",
    bold: "TimesNewRoman-Bold.ttf",
    italics: "TimesNewRoman-Italic.ttf",
    bolditalics: "TimesNewRoman-BoldItalic.ttf",
  },
  Garamond: {
    normal: "Garamond-Regular.ttf",
    bold: "Garamond-Bold.ttf",
    italics: "Garamond-Italic.ttf",
    bolditalics: "Garamond-BoldItalic.ttf",
  },
};

const GeneratePDF = () => {
  const location = useLocation();
  const [inspectionData, setInspectionData] = useState(null);
  const sldRef = useRef(null);

  useEffect(() => {
    if (location.state) {
      setInspectionData(location.state.inspectionData);
    }
  }, [location.state]);

  const formatThermalStatus = (status) => {
    const normalized = String(status).toLowerCase();
    if (normalized === "m") return "Medium";
    if (normalized === "h") return "High";
    return status;
  };

  const visualTemplate = {
    1: {
      name: "bus_bar",
      options: { 1: "Coated", 2: "Barred Conductor/sleeve" },
    },
    2: {
      name: "busbar_do_jumper",
      options: { 1: "Coated", 2: "Barred Conductor/sleeve" },
    },
    3: {
      name: "ug_cable_jumper",
      options: { 1: "Lug", 2: "Binding", 0: "na" },
    },
    4: {
      name: "tc_condition",
      options: { 1: "Straight", 2: "Tilted", 3: "Plinth", 4: "Pole structure" },
    },
    5: { name: "bird_guard", options: { 1: "Yes", 0: "No" } },
    6: {
      name: "do_tc_jumper",
      options: { 1: "Coated", 2: "Barred Conductor/sleeve" },
    },
    7: { name: "ht_booting", options: { 1: "Yes", 0: "No" } },
    8: { name: "lt_booting", options: { 1: "Yes", 0: "No" } },
    9: { name: "breather_installed", options: { 1: "Yes", 0: "No" } },
    10: { name: "silica_gel_color", options: { 1: "Blue", 2: "Orange" } },
    11: { name: "oil_leakage", options: { 1: "Yes", 0: "No" } },
    12: { name: "oil_level", options: { 1: "Normal", 2: "Low" } },
    13: { name: "tc_fencing", options: { 1: "Yes", 0: "No" } },
    14: { name: "fuse_box_external", options: { 1: "Closed", 2: "Open" } },
    15: { name: "fuse_box_internal_burn", options: { 1: "Yes", 0: "No" } },
    16: {
      name: "lt_cable_connection",
      options: { 1: "Lug", 2: "Patta", 3: "Binding" },
    },
  };
  const getOptionText = (point, value) => {
    const option = visualTemplate[point]?.options[value];
    return option ? option : "N/A";
  };

  const generatePDF = async () => {
    if (!inspectionData) return;

    const visualInspectionData = Object.entries(
      inspectionData.visual_inspection || {}
    ).map(([templateId, selectedValue]) => {
      const template = visualTemplate[templateId];
      if (!template)
        return { text: `Unknown Item (${templateId})`, margin: [0, 2] };

      const label = template.name.replace(/_/g, " ");
      const humanReadable = template.options[selectedValue] || "Not Available";

      return {
        text: `${
          label.charAt(0).toUpperCase() + label.slice(1)
        }: ${humanReadable}`,
        margin: [0, 2],
      };
    });

    let thermalInspection = [];

    if (typeof inspectionData.thermal_inspection === "string") {
      try {
        const thermalStatus = JSON.parse(inspectionData.thermal_inspection);
        thermalInspection.push({
          text: `Status: ${
            formatThermalStatus(thermalStatus.status) || "Unknown"
          }`,
        });
      } catch (e) {
        thermalInspection.push({ text: "Invalid thermal inspection data" });
      }
    } else if (typeof inspectionData.thermal_inspection === "object") {
      thermalInspection = Object.entries(inspectionData.thermal_inspection).map(
        ([deviceId, status]) => ({
          text: `${deviceId}: ${formatThermalStatus(status)}`,
          margin: [0, 2],
        })
      );
    } else {
      thermalInspection.push({ text: "Unknown thermal data format" });
    }

    let sldImage = null;
    if (sldRef.current) {
      const canvas = await html2canvas(sldRef.current, { useCORS: true });
      sldImage = canvas.toDataURL("image/png");
    }

    const docDefinition = {
      content: [
        { text: "Inspection Report", style: "header" },
        {
          text: `Inspection ID: ${inspectionData.inspection_id}`,
          style: "subheader",
        },
        { text: `Date: ${inspectionData.inspection_date}` },
        { text: `Location: ${inspectionData.location_id}` },

        {
          text: "Visual Inspection",
          style: "sectionHeader",
          margin: [0, 15, 0, 5],
        },
        ...visualInspectionData,

        {
          text: "Thermal Inspection",
          style: "sectionHeader",
          margin: [0, 15, 0, 5],
        },
        ...thermalInspection,

        sldImage
          ? {
              text: "Thermal View (SLD)",
              style: "sectionHeader",
              margin: [0, 20, 0, 5],
            }
          : null,
        sldImage
          ? {
              image: sldImage,
              width: 500,
              margin: [0, 5, 0, 0],
            }
          : null,
      ].filter(Boolean),
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          decoration: "underline",
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`inspection_${inspectionData.inspection_id}.pdf`);
  };






  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Inspection Data Preview
      </h2>

      <div className="flex space-x-8">
        <div
          ref={sldRef}
          className="flex-1 mb-6 border rounded shadow p-4 bg-white"
        >
          {(() => {
            const parsedThermal =
              typeof inspectionData?.thermal_inspection === "string"
                ? JSON.parse(inspectionData.thermal_inspection)
                : inspectionData?.thermal_inspection;

            // Check if location type is Transformer or Fuse
            const locationType = inspectionData?.location_type;

        
            if (parsedThermal?.status === "notdone") {
              if (locationType === "Transformer") {
                return <TcSldPrint />; 
              } else if (locationType === "Fuse") {
                return <FuseSldPrint />; 
              }
            }

            
            if (locationType === "Transformer") {
              return <TcSldPrint thermalInspection={parsedThermal} />;
            } else if (locationType === "Fuse") {
              return <FuseSldPrint thermalInspection={parsedThermal} />;
            }

            return null; 
          })()}
        </div>

      
        <div className="flex-1 space-y-4 bg-gray-100 p-4 rounded shadow overflow-auto">
          {!inspectionData ? (
            <p className="text-red-600">Loading or no data found.</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-700">
                Raw Inspection Data
              </h3>

              <div className="space-y-2">
                <p>
                  <strong>Inspection ID:</strong> {inspectionData.inspection_id}
                </p>
                <p>
                  <strong>Inspection Done By:</strong>{" "}
                  {inspectionData.inspection_done_by}
                </p>
                <p>
                  <strong>Inspection Date:</strong>{" "}
                  {new Date(inspectionData.inspection_date).toLocaleString()}
                </p>
                <p>
                  <strong>Location ID:</strong> {inspectionData.location_id}
                </p>
                <p>
                  <strong>Project ID:</strong> {inspectionData.project_id}
                </p>
                <p>
                  <strong>Location Type:</strong> {inspectionData.location_type}
                </p>

                <h4 className="font-semibold text-gray-600">
                  Visual Inspection:
                </h4>
                <ul className="list-disc pl-6">
                  {Object.entries(inspectionData.visual_inspection).map(
                    ([key, value]) => (
                      <li key={key}>
                        <strong>
                          {visualTemplate[key]?.name.replace(/_/g, " ")}
                        </strong>
                        : {getOptionText(key, value)}
                      </li>
                    )
                  )}
                </ul>

                <h4 className="font-semibold text-gray-600">
                  Thermal Inspection:
                </h4>
                <pre className="bg-gray-200 p-2 rounded text-sm text-gray-800">
                  {inspectionData.thermal_inspection === '{"status":"notdone"}'
                    ? "Thermal Inspection: Not Done"
                    : `Status: ${inspectionData.thermal_inspection.status}`}
                </pre>

                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(inspectionData.created_at).toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

    
      {inspectionData && (
        <div className="mt-6">
          <button
            onClick={generatePDF}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratePDF;