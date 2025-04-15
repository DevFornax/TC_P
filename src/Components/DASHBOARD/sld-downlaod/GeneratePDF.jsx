import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import TcSldPrint from "./TcSldPrint";
import FuseSldPrint from "./FuseSldPrint";
import SwitchSldPrint from "./SwitchSldPrint";
import { visualTemplate } from "../../utils/VisualTemplateforVisualFields";
import Topbar from "../../Topbar"

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
const [activeTab, setActiveTab] = useState("visual");
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

  if (!inspectionData) return
let thermalInspectionData = inspectionData.thermal_inspection;

if (typeof thermalInspectionData === "string") {
  try {
    thermalInspectionData = JSON.parse(thermalInspectionData);
  } catch (error) {
    thermalInspectionData = { status: "notdone" };
  }
}

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
      if (!template) return { label: `Unknown (${templateId})`, value: "N/A" };

      const label = template.name.replace(/_/g, " ");
      const humanReadable = template.options[selectedValue] || "Not Available";

      return {
        label: label.charAt(0).toUpperCase() + label.slice(1),
        value: humanReadable,
      };
    });

  
    const chunkedVisualRows = [];
    for (let i = 0; i < visualInspectionData.length; i += 2) {
      const left = visualInspectionData[i];
      const right = visualInspectionData[i + 1];

      chunkedVisualRows.push([
        { text: left?.label || "", bold: true },
        { text: left?.value || "" },
        { text: right?.label || "", bold: true },
        { text: right?.value || "" },
      ]);
    }

  
    let sldImage = null;
    if (sldRef.current) {
      const canvas = await html2canvas(sldRef.current, {
        useCORS: true,
        scale: 2,
      });
      sldImage = canvas.toDataURL("image/png");
    }
    function formatTime(time) {
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const suffix = hours < 12 ? "AM" : "PM";
      const formattedTime = `${hours % 12 || 12}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${suffix}`;

     
      let partOfDay = "";
      if (hours >= 5 && hours < 12) {
        partOfDay = "Morning";
      } else if (hours >= 12 && hours < 17) {
        partOfDay = "Afternoon";
      } else if (hours >= 17 && hours < 21) {
        partOfDay = "Evening";
      } else {
        partOfDay = "Night";
      }

      return `${formattedTime} (${partOfDay})`;
    }

    const docDefinition = {
      content: [
        {
          text: "Inspection Report",
          style: "header",
        },

        // {
        //   text: `Inspection ID: ${inspectionData.inspection_id}`,
        //   margin: [0, 2, 0, 2],
        // },
        // {
        //   text: `Inspection Done By: ${inspectionData.inspection_done_by}`,
        //   margin: [0, 2, 0, 2],
        // },
        // {
        //   text: `Date: ${new Date(
        //     inspectionData.inspection_date
        //   ).toLocaleDateString()}`,
        //   margin: [0, 2, 0, 2],
        // },
        // {
        //   // Using the formatTime function to format the time
        //   text: `Time: ${formatTime(new Date(inspectionData.inspection_date))}`,
        //   margin: [0, 2, 0, 2], // Reduced margin
        // },
        // {
        //   text: `Location Id: ${inspectionData.location_id}`,
        //   margin: [0, 2, 0, 2],
        // },
        // {
        //   text: `Location Type: ${inspectionData.location_type}`,
        //   margin: [0, 2, 0, 2],
        // },
        // {
        //   text: `Project ID: ${inspectionData.project_id}`,
        //   margin: [0, 2, 0, 10],
        // },

        {
          table: {
            widths: ["25%", "25%", "25%", "25%"], // 4 columns side by side
            body: [
              [
                { text: "Date", bold: true },
                new Date(inspectionData.inspection_date).toLocaleDateString(
                  "en-GB"
                ),

                { text: "Time", bold: true },
                formatTime(new Date(inspectionData.inspection_date)),
              ],
              [
                { text: "Inspection ID", bold: true },
                inspectionData.inspection_id,
                { text: "Inspection Done By", bold: true },
                inspectionData.inspection_done_by,
              ],

              [
                { text: "Location Id", bold: true },
                inspectionData.location_id,
                { text: "Project ID", bold: true },
                inspectionData.project_id,
              ],
              [
                { text: "Location Type", bold: true },
                inspectionData.location_type,
                "",
                "",
              ],
            ],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex % 2 === 0 ? "#f2f2f2" : null),
          },
          margin: [0, 10, 0, 10],
        },
        {
          text: "Visual Inspection Results",
          style: "sectionHeader",
          margin: [0, 10, 0, 5],
        },

        {
          table: {
            widths: ["25%", "25%", "25%", "25%"],
            body: [
              [
                { text: "Item Type", style: "tableHeader" },
                { text: "Data", style: "tableHeader" },
                { text: "Item Type", style: "tableHeader" },
                { text: "Data", style: "tableHeader" },
              ],
              ...chunkedVisualRows,
            ],
          },
          layout: {
            fillColor: function (rowIndex) {
              return rowIndex === 0 ? "#eee" : null;
            },
          },
        },

        // SLD Image Section
        sldImage
          ? {
              text: "Thermal Inspection Results",
              style: "sectionHeader",
              margin: [0, 15, 0, 5],
            }
          : null,
        sldImage
          ? {
              image: sldImage,
              width: 500,
              margin: [0, 5, 0, 10],
            }
          : null,
      ].filter(Boolean),

      footer: function (currentPage, pageCount) {
        return {
          text: `ThermoVis - Powered by Fornax `,
          alignment: "right",
          style: "footer",
          margin: [0, 10, 20, 10],
        };
      },

      styles: {
       
        header: {
          fontSize: 16,
          bold: true,
          alignment: "left",
          margin: [0, 0, 0, 5],
        },
        
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 2, 0, 2], 
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          decoration: "underline",
        },
       
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "black",
        },
       
        footer: {
          fontSize: 10,
          italics: true,
          alignment: "right",
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`inspection_${inspectionData.inspection_id}.pdf`);
  };

  return (
    <>
      <Topbar />

      {/* <div className="p-4 sm:p-6 md:p-8 bg-[#d9e4ec] min-h-screen">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-[#385e72] mb-4 sm:mb-0">
            Inspection Data Preview
          </h2>
        </div>

        <div className="mb-6 bg-white p-5 rounded-xl shadow-md border border-[#b7cfdc]">
          <h3 className="text-lg sm:text-xl font-semibold text-[#385e72] mb-4">
            General Information
          </h3>
          <div className="space-y-3 text-sm sm:text-base text-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Inspection ID:</strong> {inspectionData?.inspection_id}
              </p>
              <p>
                <strong>Done By:</strong> {inspectionData?.inspection_done_by}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(inspectionData?.inspection_date).toLocaleString()}
              </p>
              <p>
                <strong>Location ID:</strong> {inspectionData?.location_id}
              </p>
              <p>
                <strong>Project ID:</strong> {inspectionData?.project_id}
              </p>
              <p>
                <strong>Type:</strong> {inspectionData?.location_type}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(inspectionData?.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {inspectionData && (
            <div className="flex justify-end mt-4">
              <button
                onClick={generatePDF}
                className="px-6 py-3 bg-[#385e72] text-white rounded-lg hover:bg-[#6aabd2] transition duration-200 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h4a1 1 0 110 2H5v12h10V4h-3a1 1 0 110-2h4a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm7 5a1 1 0 00-1 1v4.586L7.707 11.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L11 13.586V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Download PDF Report
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full h-full overflow-hidden rounded-xl bg-white p-4  shadow-md ">
            <button className=" bg-[#385e72] text-white px-4 py-2 rounded-md m-4 text-sm font-semibold">
              Thermal Inspection Report
            </button>
            <div
              ref={sldRef}
              className="w-full  overflow-hidden rounded-xl shadow-md border  bg-white"
            >
              {(() => {
                const parsedThermal =
                  typeof inspectionData?.thermal_inspection === "string"
                    ? JSON.parse(inspectionData.thermal_inspection)
                    : inspectionData?.thermal_inspection;

                const locationType = inspectionData?.location_type;

                if (parsedThermal?.status === "notdone") {
                  if (locationType === "Transformer") return <TcSldPrint />;
                  else if (locationType === "Fuse") return <FuseSldPrint />;
                  else if (locationType === "Switch") return <SwitchSldPrint />;
                }

                if (locationType === "Transformer")
                  return <TcSldPrint thermalInspection={parsedThermal} />;
                else if (locationType === "Fuse")
                  return <FuseSldPrint thermalInspection={parsedThermal} />;
                else if (locationType === "Switch")
                  return <SwitchSldPrint thermalInspection={parsedThermal} />;

                return null;
              })()}
            </div>
          </div>
          <div className="w-full   rounded-xl ">
            {!inspectionData ? (
              <p className="text-red-600 font-medium">
                Loading or no data found.
              </p>
            ) : (
              <div className=" text-sm sm:text-base text-gray-800">
                <div className="p-4 space-y-4 bg-white rounded-lg border  shadow-md">
                  <div className="flex gap-4 mb-4">
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-semibold ${
                        activeTab === "visual"
                          ? "bg-[#385e72] text-white"
                          : "bg-gray-200 text-[#385e72] hover:bg-gray-300"
                      }`}
                      onClick={() => setActiveTab("visual")}
                    >
                      Visual Inspection
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-semibold ${
                        activeTab === "thermal"
                          ? "bg-[#385e72] text-white"
                          : "bg-gray-200 text-[#385e72] hover:bg-gray-300"
                      }`}
                      onClick={() => setActiveTab("thermal")}
                    >
                      Thermal Inspection
                    </button>
                  </div>

                  {activeTab === "visual" && (
                    <div>
                      <h4 className="font-semibold text-[#385e72] text-lg">
                        Visual Inspection
                      </h4>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {Object.entries(inspectionData.visual_inspection).map(
                          ([key, value]) => (
                            <li key={key}>
                              <strong>
                                {visualTemplate[key]?.name.replace(/_/g, " ")}:
                              </strong>{" "}
                              {getOptionText(key, value)}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {activeTab === "thermal" && (
                    <div>
                      <h4 className="font-semibold text-[#385e72] text-lg">
                        Thermal Inspection
                      </h4>
                      <div className="bg-[#d9e4ec] p-4 rounded-lg border border-[#b7cfdc] space-y-2">
                        {thermalInspectionData.status === "notdone" ? (
                          <p className="text-sm text-red-600 font-semibold">
                            Thermal Inspection: Not Done
                          </p>
                        ) : (
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {Object.entries(thermalInspectionData).map(
                              ([pointId, condition]) => (
                                <li key={pointId}>
                                  <strong>{pointId}:</strong>{" "}
                                  {condition === "H"
                                    ? "High"
                                    : condition === "M"
                                    ? "Medium"
                                    : condition === "L"
                                    ? "Low"
                                    : condition}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}

      <div className="p-4 sm:p-6 md:p-8 bg-[#d9e4ec] min-h-screen">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-[#385e72] mb-4 sm:mb-0">
            Inspection Data Preview
          </h2>
        </div>

        <div className="mb-6 bg-white p-5 rounded-xl shadow-md border border-[#b7cfdc]">
          <h3 className="text-lg sm:text-xl font-semibold text-[#385e72] mb-4">
            General Information
          </h3>
          <div className="space-y-3 text-sm sm:text-base text-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Inspection ID:</strong> {inspectionData?.inspection_id}
              </p>
              <p>
                <strong>Done By:</strong> {inspectionData?.inspection_done_by}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(inspectionData?.inspection_date).toLocaleString()}
              </p>
              <p>
                <strong>Location ID:</strong> {inspectionData?.location_id}
              </p>
              <p>
                <strong>Project ID:</strong> {inspectionData?.project_id}
              </p>
              <p>
                <strong>Type:</strong> {inspectionData?.location_type}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(inspectionData?.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {inspectionData && (
            <div className="flex justify-end mt-4">
              <button
                onClick={generatePDF}
                className="px-6 py-3 bg-[#385e72] text-white rounded-lg hover:bg-[#6aabd2] transition duration-200 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h4a1 1 0 110 2H5v12h10V4h-3a1 1 0 110-2h4a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm7 5a1 1 0 00-1 1v4.586L7.707 11.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L11 13.586V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Download PDF Report
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full h-full overflow-hidden rounded-xl bg-white p-4  shadow-md ">
            <button className=" bg-[#385e72] text-white px-4 py-2 rounded-md m-4 text-sm font-semibold">
              Thermal Inspection Report
            </button>
            <div
              ref={sldRef}
              className="w-full  overflow-hidden rounded-xl shadow-md border  bg-white"
            >
              {(() => {
                const parsedThermal =
                  typeof inspectionData?.thermal_inspection === "string"
                    ? JSON.parse(inspectionData.thermal_inspection)
                    : inspectionData?.thermal_inspection;

                const locationType = inspectionData?.location_type;

                if (parsedThermal?.status === "notdone") {
                  if (locationType === "Transformer") return <TcSldPrint />;
                  else if (locationType === "Fuse") return <FuseSldPrint />;
                  else if (locationType === "Switch") return <SwitchSldPrint />;
                }

                if (locationType === "Transformer")
                  return <TcSldPrint thermalInspection={parsedThermal} />;
                else if (locationType === "Fuse")
                  return <FuseSldPrint thermalInspection={parsedThermal} />;
                else if (locationType === "Switch")
                  return <SwitchSldPrint thermalInspection={parsedThermal} />;

                return null;
              })()}
            </div>
          </div>
          <div className="w-full   rounded-xl ">
            {!inspectionData ? (
              <p className="text-red-600 font-medium">
                Loading or no data found.
              </p>
            ) : (
              <div className=" text-sm sm:text-base text-gray-800">
                <div className="w-full h-full overflow-hidden rounded-xl bg-white p-4  shadow-md ">
                  <button className=" bg-[#385e72] text-white px-4 py-2 rounded-md m-4 text-sm font-semibold">
                    Visual Inspection Report
                  </button>
                  <div className=" m-3 border rounded-lg sja  p-4">
                    {activeTab === "visual" && (
                      <div>
                        <h4 className="font-semibold text-[#385e72] text-lg">
                          Visual Inspection
                        </h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {Object.entries(inspectionData.visual_inspection).map(
                            ([key, value]) => (
                              <li key={key}>
                                <strong>
                                  {visualTemplate[key]?.name.replace(/_/g, " ")}
                                  :
                                </strong>{" "}
                                {getOptionText(key, value)}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <br />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneratePDF;
