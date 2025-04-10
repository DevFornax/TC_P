// components/LocationInfoCard.jsx
import React from "react";
import { InfoItem } from "../UI/InfoItem";
import { SectionWithToggle } from "../UI/SectionwithToggle";

export default function LocationInfoCard({ locationdata }) {

  if (!locationdata) return null;

  const { id, project_id, project_name, substation_name, attributes } =
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
    <div className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <h2 className="text-2xl font-bold text-[#6c63ff] mb-4 sm:mb-0">
          Location Information
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <InfoItem label="Location ID" value={id} />
        <InfoItem label="Project Id" value={project_id} />
        <InfoItem label="Project" value={project_name} />
        <InfoItem label="Substation" value={substation_name} />
        <InfoItem label="Point Type" value={point_type} />
        <InfoItem label="Point No" value={point_no} />
        <InfoItem label="Area Code" value={area_code} />
       
      </div>
      
      <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
     
        <a
          href={`https://www.google.com/maps?q=${validLat},${validLng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-1.5 rounded-full bg-[#6c63ff] text-white text-xs font-semibold shadow-md hover:bg-indigo-600 transition"
        >
          Show on Google Maps 🌐
        </a>
      </div>
      <SectionWithToggle>
        <InfoItem label="Support Type" value={point_props.support_type} />
        <InfoItem label="Structure Type" value={point_props.structure_type} />
        <InfoItem label="Pole Type" value={point_props.pole_type} />
        <InfoItem label="Earthing Type" value={point_props.earthing_type} />
        <InfoItem label="Scheme" value={point_props.scheme} />
        <InfoItem label="Position" value={line_props.position} />
        <InfoItem label="Type" value={line_props.type} />
        <InfoItem
          label="Spare Line"
          value={line_props.has_spare_line ? "Yes" : "No"}
        />
      </SectionWithToggle>
    </div>
  );
}
