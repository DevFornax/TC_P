import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
   <>
   
    <div className="relative w-full">

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[999] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b font-bold text-lg">Sidebar</div>
        <div className="p-4">🗂️ Your stuff here!</div>
      </div>


      <button
        className="absolute top-28 left-3 z-[1000] bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 shadow"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? "Close" : "Menu"}
      </button>


      <MapContainer
        center={[23.0225, 72.5714]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.0225, 72.5714]}>
          <Popup>Hey! You're in Ahmedabad 😎</Popup>
        </Marker>
      </MapContainer>
    </div>
   </>
  );
}
