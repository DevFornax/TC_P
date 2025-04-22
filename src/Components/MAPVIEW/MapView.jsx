
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Topbar from "../Topbar";
import LeftSidebar from "./LeftSidebar";

export default function MapView() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState("calc(100vh - 4px)");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const updateHeight = () => {
      const header = document.querySelector("header");
      const headerHeight = header?.offsetHeight || 64;
      setMapHeight(`calc(100vh - ${headerHeight}px)`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <Topbar />
      <div className="relative w-full h-full mt-16">
        <LeftSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <button
          className={`absolute top-3 z-[700] bg-[#385e72] p-3 rounded-full hover:bg-[#6aabd2] shadow transition-all duration-300 ease-in-out ${
            sidebarOpen ? "left-[16.5rem]" : "left-3"
          }`}
          onClick={toggleSidebar}
        >
          <img
            src="/menu.svg"
            alt="menu icon"
            className="w-6 h-6 invert"
          />
        </button>

        <div className="flex h-full">
          <div className="flex-1" style={{ height: mapHeight }}>
            <MapContainer
              center={[23.0225, 72.5714]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
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
        </div>
      </div>
    </>
  );
}
