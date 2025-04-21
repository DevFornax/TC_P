// import React, { useState } from "react";
// import { InfoItem } from "../UI/InfoItem";
// import { SectionWithToggle } from "../UI/SectionwithToggle";

// export default function LocationInfoCard({ locationdata }) {
//   const [showCardOfLocationData, setshowCardOfLocationData] = useState(false);

//   if (!locationdata)
//     return (
//       <div>
//         <div className="p-6 border border-[#b7cfdc] rounded-xl shadow-lg bg-[#d9e4ec] space-y-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
//             <h2 className="text-2xl font-bold text-[#385e72] mb-4 sm:mb-0">
//               Location Data
//             </h2>
//           </div>
//           <p className="text-[#385e72] text-center font-semibold">
//             Please select a valid Location ID to view the location details.
//           </p>
//         </div>
//       </div>
//     );

//   const { id, project_id, project_name, substation_name, attributes } =
//     locationdata;
//   const {
//     point_type,
//     point_no,
//     area_code,
//     lat,
//     lng,
//     point_props = {},
//     line_props = {},
//   } = attributes;

//   const getValidCoordinates = (lat, lng) => {
//     const latNum = parseFloat(lat);
//     const lngNum = parseFloat(lng);
//     const isLatValid = latNum >= 20 && latNum <= 25;
//     const isLngValid = lngNum >= 68 && lngNum <= 75;
//     if (isLatValid && isLngValid) return { lat: latNum, lng: lngNum };
//     const isAltLatValid = lngNum >= 20 && lngNum <= 25;
//     const isAltLngValid = latNum >= 68 && latNum <= 75;
//     if (isAltLatValid && isAltLngValid) return { lat: lngNum, lng: latNum };
//     return { lat: latNum, lng: lngNum };
//   };

//   const { lat: validLat, lng: validLng } = getValidCoordinates(lat, lng);

//   return (
//     <div className="border border-[#b7cfdc] rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-in-out bg-[#d9e4ec]">
//       <div
//         onClick={() => setshowCardOfLocationData(!showCardOfLocationData)}
//         className="cursor-pointer bg-[#6aabd2] text-white px-6 py-3 flex justify-between items-center text-lg font-semibold"
//       >
//         <span>Location Information</span>
//         <span>{showCardOfLocationData ? "▲" : "▼"}</span>
//       </div>

//       <div
//         className={`transition-all duration-500 ease-in-out ${
//           showCardOfLocationData
//             ? "opacity-100 scale-y-100"
//             : "opacity-0 scale-y-0 h-0"
//         } origin-top transform`}
//       >
//         {showCardOfLocationData && (
//           <div className="p-6 bg-white space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//               <InfoItem label="Location ID" value={id} />
//               <InfoItem label="Project Id" value={project_id} />
//               <InfoItem label="Project" value={project_name} />
//               <InfoItem label="Substation" value={substation_name} />
//               <InfoItem label="Point Type" value={point_type} />
//               <InfoItem label="Point No" value={point_no} />
//               <InfoItem label="Area Code" value={area_code} />
//             </div>

//             <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
//               <a
//                 href={`https://www.google.com/maps?q=${validLat},${validLng}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block px-4 py-1.5 rounded-full bg-[#385e72] text-white text-xs font-semibold shadow-md hover:bg-[#2d4758] transition"
//               >
//                 Show on Google Maps 🌐
//               </a>
//             </div>

//             <SectionWithToggle>
//               <InfoItem label="Support Type" value={point_props.support_type} />
//               <InfoItem
//                 label="Structure Type"
//                 value={point_props.structure_type}
//               />
//               <InfoItem label="Pole Type" value={point_props.pole_type} />
//               <InfoItem
//                 label="Earthing Type"
//                 value={point_props.earthing_type}
//               />
//               <InfoItem label="Scheme" value={point_props.scheme} />
//               <InfoItem label="Position" value={line_props.position} />
//               <InfoItem label="Type" value={line_props.type} />
//               <InfoItem
//                 label="Spare Line"
//                 value={line_props.has_spare_line ? "Yes" : "No"}
//               />
//             </SectionWithToggle>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { InfoItem } from "../UI/InfoItem";
import { SectionWithToggle } from "../UI/SectionWithToggle";

export default function LocationInfoCard({ locationdata }) {
  const [showCardOfLocationData, setShowCardOfLocationData] = useState(false);

  if (!locationdata)
    return (
      <div>
        <div className="p-6 border border-[#b7cfdc] rounded-xl shadow-lg bg-[#d9e4ec] space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
            <h2 className="text-2xl font-bold text-[#385e72] mb-4 sm:mb-0">
              Location Data
            </h2>
            <br />
            <br />
          </div>
          <p className="text-[#385e72] text-center font-semibold">
            Please select a valid Location ID to view the location details.
          </p>
        </div>
      </div>
    );

  const { id, project_id, project_name, substation_name, attributes , location_name } =
    locationdata;
  const {
    point_type,
    point_no,
    area_code,
    lat,
    lng,
    point_props = {},
    line_props = {},
  } = attributes;

  const getValidCoordinates = (lat, lng) => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const isLatValid = latNum >= 20 && latNum <= 25;
    const isLngValid = lngNum >= 68 && lngNum <= 75;
    if (isLatValid && isLngValid) return { lat: latNum, lng: lngNum };
    const isAltLatValid = lngNum >= 20 && lngNum <= 25;
    const isAltLngValid = latNum >= 68 && latNum <= 75;
    if (isAltLatValid && isAltLngValid) return { lat: lngNum, lng: latNum };
    return { lat: latNum, lng: lngNum };
  };

  const { lat: validLat, lng: validLng } = getValidCoordinates(lat, lng);

  return (
    <div className="border border-[#b7cfdc] rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-in-out bg-[#d9e4ec]">
      <div
        onClick={() => setShowCardOfLocationData(!showCardOfLocationData)}
        className="cursor-pointer bg-[#385e72] text-white px-6 py-3 flex justify-between items-center text-lg font-semibold"
      >
        <span>Location Information</span>
        <span>{showCardOfLocationData ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${
          showCardOfLocationData
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 h-0"
        } origin-top transform`}
      >
        {showCardOfLocationData && (
          <div className="p-6 bg-white space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <InfoItem label="Location ID" value={id} />
              <InfoItem label="Project Id" value={project_id} />
              <InfoItem label="Project" value={project_name} />
              <InfoItem label="Substation" value={substation_name} />
              <InfoItem label="Point Type" value={point_type} />
              <InfoItem label="Point No" value={point_no} />
              <InfoItem label="Area Code" value={area_code} />
              <InfoItem label="location name" value={location_name ? location_name :"NA"} />
            </div>

            <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <a
                href={`https://www.google.com/maps?q=${validLat},${validLng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-1.5 rounded-full bg-[#385e72] text-white text-xs font-semibold shadow-md hover:bg-[#6aabd2] transition"
              >
                Show on Google Maps 🌐
              </a>
            </div>

            <SectionWithToggle>
              <InfoItem label="Support Type" value={point_props.support_type} />
              <InfoItem
                label="Structure Type"
                value={point_props.structure_type}
              />
              <InfoItem label="Pole Type" value={point_props.pole_type} />
              <InfoItem
                label="Earthing Type"
                value={point_props.earthing_type}
              />
              <InfoItem label="Scheme" value={point_props.scheme} />
              <InfoItem label="Position" value={line_props.position} />
              <InfoItem label="Type" value={line_props.type} />
              <InfoItem
                label="Spare Line"
                value={line_props.has_spare_line ? "Yes" : "No"}
              />
            </SectionWithToggle>
          </div>
        )}
      </div>
    </div>
  );
}
