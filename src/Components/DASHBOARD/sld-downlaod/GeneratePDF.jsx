import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FornaxLogo, DGVCLLogo } from "../../utils/Base64PdfLogo";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas";
import TcSldPrint from "./TcSldPrint";
import FuseSldPrint from "./FuseSldPrint";
import SwitchSldPrint from "./SwitchSldPrint";
import { visualTemplate } from "../../utils/VisualTemplateforVisualFields";
import Topbar from "../../Topbar";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [inspectionData, setInspectionData] = useState(null);
  const sldRef = useRef(null);
  const [activeTab, setActiveTab] = useState("visual");
  useEffect(() => {
    if (location.state) {
      setInspectionData(location.state.inspectionData);
    }
  }, [location.state]);

  if (!inspectionData) return;
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
  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const generatePDF = async () => {
    if (!inspectionData) return;

    const visualInspectionData = Object.entries(
      inspectionData.visual_inspection || {}
    ).map(([templateId, selectedValue]) => {
      const template = visualTemplate[templateId];
      if (!template) return { label: `Unknown (${templateId})`, value: "N/A" };

      const knownAbbr = ["HT", "LT", "DO", "UG", "NI", "TC"];
      const label = template.name
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => {
          const upper = word.toUpperCase();
          return knownAbbr.includes(upper)
            ? upper
            : word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
      const humanReadable = template.options[selectedValue] || "Not Available";

      return {
        label,
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

      let partOfDay;
      if (hours >= 5 && hours < 12) partOfDay = "Morning";
      else if (hours >= 12 && hours < 17) partOfDay = "Afternoon";
      else if (hours >= 17 && hours < 21) partOfDay = "Evening";
      else partOfDay = "Night";

      return `${formattedTime} `;
    }

    function chunkArray(arr, size) {
      const result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    }

    function generateDynamicThermalTable(inspectionData) {
      const entries = Object.entries(
        inspectionData?.thermal_inspection || {}
      ).map(([pointId, status]) => {
        const condition =
          status === "H"
            ? "High"
            : status === "M"
            ? "Medium"
            : status === "L"
            ? "Low"
            : "Normal";

        return [pointId, condition];
      });

      const count = entries.length;

      if (count <= 3) {
        const body = [["Point ID", "Condition"]];
        entries.forEach(([pointId, condition]) => {
          body.push([pointId, condition]);
        });

        return {
          table: {
            widths: ["30%", "30%"],
            body,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#eee" : null),
          },
          margin: [0, 0, 0, 20],
          fontSize: 10,
        };
      }

      if (count <= 16) {
        const body = [["Point ID", "Condition", "Point ID", "Condition"]];
        const chunks = chunkArray(entries, 2);
        chunks.forEach((pair) => {
          const flat = pair.flat();
          while (flat.length < 4) flat.push("");
          body.push(flat);
        });

        return {
          table: {
            widths: ["25%", "25%", "25%", "25%"],
            body,
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex === 0 ? "#eee" : null),
          },

          margin: [0, 0, 0, 20],
          fontSize: 10,
        };
      }

      const body = [
        [
          "Point ID",
          "Condition",
          "Point ID",
          "Condition",
          "Point ID",
          "Condition",
        ],
      ];
      const chunks = chunkArray(entries, 3);
      chunks.forEach((triplet) => {
        const flat = triplet.flat();
        while (flat.length < 6) flat.push("");
        body.push(flat);
      });

      return {
        table: {
          widths: ["16.66%", "16.66%", "16.66%", "16.66%", "16.66%", "16.66%"],
          body,
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 0 ? "#eee" : null),
        },
        margin: [0, 0, 0, 20],

        fontSize: 10,
      };
    }

    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: FornaxLogo,
              width: 60,
              height: 60,
              margin: [0, 0, 10, 0],
            },
            {
              stack: [
                { text: "Inspection Report", style: "header" },
                { text: "Thermal & Visual Inspection", style: "subheader" },
              ],
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
            {
              image: DGVCLLogo,
              width: 60,
              height: 60,
              alignment: "right",
              margin: [10, 0, 0, 0],
            },
          ],
          margin: [0, 0, 0, 10],
        },

        {
          text: "General Information",
          style: "sectionHeader",
          margin: [0, 20, 0, 10],
        },

        {
          table: {
            widths: ["25%", "25%", "25%", "25%"],
            body: [
              [
                { text: "Inspection ID", bold: true },
                inspectionData.inspection_id || "",
                { text: "Date & Time", bold: true },
                `${new Date(inspectionData.inspection_date).toLocaleDateString(
                  "en-GB"
                )} ${formatTime(new Date(inspectionData.inspection_date))}`,
              ],
              [
                { text: "Substation Name", bold: true },
                inspectionData.substation_name || "",
                { text: "Project", bold: true },
                `${inspectionData.project_id || ""} - ${
                  inspectionData.project_name || ""
                }`,
              ],
              [
                { text: "Location ID", bold: true },
                inspectionData.location_id || "",
                { text: "Location Type", bold: true },
                inspectionData.location_type || "",
              ],
              [
                { text: "Location Name", bold: true },
                { text: inspectionData.location_name || "", colSpan: 3 },
                {},
                {},
              ],
            ],
          },
          layout: {
            fillColor: (rowIndex) => (rowIndex % 2 === 0 ? "#f2f2f2" : null),
          },
          margin: [0, 0, 0, 10],
        },

        {
          text: "Visual Inspection Results",
          style: "sectionHeader",
          margin: [0, 20, 0, 10],
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
            fillColor: (rowIndex) => (rowIndex === 0 ? "#eee" : null),
          },
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            {
              width: "*",
              stack: [
                {
                  text: "Additional Remarks",
                  style: "sectionHeader",
                  margin: [0, 0, 0, 10],
                },
                inspectionData?.remarks
                  ? {
                      ul: Array.isArray(inspectionData.remarks)
                        ? inspectionData.remarks
                        : inspectionData.remarks
                            .replace(/[\{\}\"]/g, "")
                            .split(",")
                            .map((remark) => remark.trim()),
                      fontSize: 10,
                      lineHeight: 1.2,
                      margin: [0, 0, 10, 0],
                    }
                  : {
                      text: "No additional remarks provided.",
                      fontSize: 10,
                      margin: [0, 0, 10, 0],
                    },
              ],
              margin: [0, 0, 0, 0],
            },
            {
              width: 1,
              canvas: [
                {
                  type: "line",
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 140,
                  lineWidth: 1,
                  lineColor: "#ccc",
                },
              ],
              margin: [5, 20, 5, 0],
            },
            {
              width: "30%",
              stack: [
                {
                  text: "Location Info",
                  style: "sectionHeader",
                  alignment: "right",
                  margin: [0, 0, 0, 10],
                },
                {
                  qr: `https://www.google.com/maps?q=${inspectionData?.lat},${inspectionData?.lang}`,
                  fit: 90,
                  alignment: "right",
                  margin: [0, 0, 0, 10],
                },
                {
                  text: "View on Google Maps",
                  link: `https://www.google.com/maps?q=${inspectionData?.lat},${inspectionData?.lang}`,
                  color: "blue",
                  decoration: "underline",
                  alignment: "right",
                  fontSize: 10,
                  margin: [0, 0, 0, 0],
                },
              ],
              margin: [0, 0, 0, 0],
            },
          ],
        },

        {
          stack: [
            { text: "", pageBreak: "before" },
            {
              columns: [
                {
                  image: FornaxLogo,
                  width: 60,
                  height: 60,
                  margin: [0, 0, 10, 0],
                },
                {
                  stack: [
                    { text: "Inspection Report", style: "header" },
                    {
                      text: "Thermal & Visual Inspection",
                      style: "subheader",
                    },
                  ],
                  alignment: "center",
                  margin: [0, 10, 0, 0],
                },
                {
                  image: DGVCLLogo,
                  width: 60,
                  height: 60,
                  alignment: "right",
                  margin: [10, 0, 0, 0],
                },
              ],
              margin: [0, 0, 0, 10],
            },
            {
              text: "Thermal Inspection Results",
              style: "sectionHeader",
              margin: [0, 10, 0, 10],
            },
            {
              image: sldImage,
              width: 500,
              margin: [0, 5, 0, 10],
            },

            {
              text: "Inspected Points",
              style: "header",
              margin: [0, 10, 0, 10],
            },
            generateDynamicThermalTable(inspectionData),
          ],
        },
      ].filter(Boolean),

      footer: (currentPage, pageCount) => ({
        text: `TwinVision - Powered by Fornax`,
        alignment: "right",
        style: "footer",
        margin: [0, 10, 20, 10],
      }),

      styles: {
        header: {
          fontSize: 15, // Reduced from 18 to 16
          bold: true,
        },
        subheader: {
          fontSize: 11, // Reduced from 14 to 12
          italics: true,
        },
        sectionHeader: {
          fontSize: 12, // Reduced from 16 to 14
          bold: true,
          decoration: "underline",
        },
        tableHeader: {
          bold: true,
          fontSize: 9, // Reduced from 10 to 8
          color: "black",
        },
        tableContent: {
          fontSize: 7, // Reduced from 9 to 7
        },
        footer: {
          fontSize: 8, // Reduced from 10 to 8
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

      <div className="p-4 sm:p-6 md:p-8 mt-14 bg-[#d9e4ec] min-h-screen">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
          <h2 className="text-xl sm:text-3xl font-bold text-[#385e72] mb-4 sm:mb-0">
            Inspection Data Preview
          </h2>
          <button
            onClick={() => navigate("/data-dashboard")}
            className="bg-[#6aabd2] text-[#385e72] px-4 py-2 rounded-md font-medium hover:bg-[#4c94c2] transition-all"
          >
            🔙 Go Back
          </button>
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
                <strong>Location name:</strong> {inspectionData?.location_name}
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
              </p>{" "}
              <p>
                <strong>Project Id</strong> {inspectionData?.project_id}
              </p>
              <p>
                <strong>Project Name</strong> {inspectionData?.project_name}
              </p>
              <p>
                <strong>Substation Id</strong> {inspectionData?.substation_id}
              </p>
              <p>
                <strong>Substation Name</strong>{" "}
                {inspectionData?.substation_name}
              </p>
              <p>
                <a
                  href={`https://www.google.com/maps?q=${inspectionData?.lat},${inspectionData?.lang}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong> View on Google Maps</strong>
                </a>
              </p>
              <p>
                <strong>Remarks:</strong>{" "}
                {inspectionData?.remarks
                  ? Array.isArray(inspectionData.remarks)
                    ? inspectionData.remarks.map((remark, index) => (
                        <li key={index}>{remark}</li>
                      ))
                    : inspectionData.remarks
                        .replace(/[\{\}\"]/g, "")
                        .split(",")
                        .map((remark, index) => (
                          <li key={index}>{remark.trim()}</li>
                        ))
                  : "No remarks"}
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
                  else if (locationType === "Switch"|| locationType === "CTPT") return <SwitchSldPrint />;
                }

                if (locationType === "Transformer")
                  return (
                    <TcSldPrint
                      thermalInspection={parsedThermal}
                      locationId={inspectionData?.location_id}
                    />
                  );
                else if (locationType === "Fuse")
                  return (
                    <FuseSldPrint
                      thermalInspection={parsedThermal}
                      locationId={inspectionData?.location_id}
                    />
                  );
                else if (locationType === "Switch" ||  locationType === "CTPT")
                  return (
                    <SwitchSldPrint
                      thermalInspection={parsedThermal}
                      locationId={inspectionData?.location_id}
                    />
                  );

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
                                  {capitalizeFirstLetter(
                                    visualTemplate[key]?.name.replace(/_/g, " ")
                                  )}
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
