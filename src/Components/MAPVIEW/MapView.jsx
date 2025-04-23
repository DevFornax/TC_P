import L from "leaflet";

import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  ZoomControl,
  ScaleControl,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  transformerIcon,
  transformerModerate,
  transformerImmediate,
  fuseIcon,
  fuseIconModerate,
  fuseIconImmediate,
  switchIcon,
  switchIconModerate,
  switchIconImmediate,
  ctptIcon,
  ctptIconrModerate,
  ctptImmediate,
} from "../utils/MapIcon";
import Topbar from "../Topbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { Navigate, useNavigate } from "react-router-dom";

const gujaratBounds = [
  [19.1, 67.0],
  [25.6, 75.5],
];

export default function MapView() {
  const mapRef = useRef(null);
const navigate = useNavigate();
  const [LeftsidebarOpen, setLeftSidebarOpen] = useState(true);
  const [RightsidebarOpen, setRightSidebarOpen] = useState(false);
  const [mapHeight, setMapHeight] = useState("calc(100vh - 4px)");
  const [locations, setLocations] = useState([]);
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [activeLayer, setActiveLayer] = useState("OpenStreetMap");
  const [locationForRightSidebar, setlocationForRightSidebar] = useState(null);
  const [locationForLeftSidebar, setlocationForLeftSidebar] = useState(null);
  const [actionForRightsidebar, setactionForRightsidebar] = useState(null);
  const [layerKey, setLayerKey] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [customPopupPosition, setCustomPopupPosition] = useState(null);

  const [
    inspectionDataBasedOnActionRequired,
    setinspectionDataBasedOnActionRequired,
  ] = useState([]);

  const handleRefresh = () => {
    setLocations([]);
    setRightSidebarOpen(false);
    setLayerKey((prev) => prev + 1);
    setlocationForLeftSidebar(null);
    setSelectedLocation(null);
    setCustomPopupPosition(null);
    setActiveLocationId(null);
    setlocationForLeftSidebar(null);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!LeftsidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!RightsidebarOpen);
  };
  const navigateHome = () =>{
    navigate("/")
  }

  const handleLocationDataFetched = (fetchedLocations) => {
    setLocations((prev) => {
      const existingIds = new Set(prev.map((loc) => loc.id));
      const newUnique = fetchedLocations.filter(
        (loc) => !existingIds.has(loc.id)
      );
      const updated = [...prev, ...newUnique];

      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);

      return updated;
    });
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

  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      const bounds = locations.map((loc) => [loc.lat, loc.lang]);
      const mapBounds = new L.LatLngBounds(bounds);
      mapRef.current.fitBounds(mapBounds, {
        padding: [50, 50],
        animate: true,
        duration: 2,
      });
      const zoom = Math.min(18, mapRef.current.getZoom());
      mapRef.current.setZoom(zoom);
    }
  }, [locations]);

  return (
    <>
      <Topbar />
      <div className="relative w-full h-full mt-16">
        <LeftSidebar
          LeftsidebarOpen={LeftsidebarOpen}
          toggleLeftSidebar={toggleLeftSidebar}
          onLocationDataFetched={handleLocationDataFetched}
          locationIdFromMaptoLeftsidebar={locationForLeftSidebar}
          oninspectionDataBasedOnActionRequiredFetched={(data) =>
            setinspectionDataBasedOnActionRequired(data)
          }
        />
        <RightSidebar
          RightsidebarOpen={RightsidebarOpen}
          setRightSidebarOpen={setRightSidebarOpen}
          toggleRightSidebar={toggleRightSidebar}
          locations={locations}
          selectedLocation={locationForRightSidebar}
          action={actionForRightsidebar}
        />
        <button
          className={`absolute top-3 z-[700] bg-[#385e72] p-3 rounded-full hover:bg-[#6aabd2] shadow transition-all duration-300 ease-in-out ${
            LeftsidebarOpen ? "left-[18.5rem]" : "left-3"
          }`}
          onClick={toggleLeftSidebar}
        >
          <img src="/menu.svg" alt="menu icon" className="w-6 h-6 invert" />
        </button>

        <button
          onClick={handleRefresh}
          className={`absolute top-[4rem] z-[700] bg-[#385e72] p-3 rounded-full hover:bg-[#6aabd2] shadow transition-all duration-300 ease-in-out ${
            LeftsidebarOpen ? "left-[18.5rem]" : "left-3"
          }`}
        >
          <img src="/refresh.svg" alt="menu icon" className="w-6 h-6 invert" />
        </button>

        <button
          onClick={navigateHome}
          className={`absolute top-[117px] z-[700] bg-[#385e72] p-3 rounded-full hover:bg-[#6aabd2] shadow transition-all duration-300 ease-in-out ${
            LeftsidebarOpen ? "left-[18.5rem]" : "left-3"
          }`}
        >
          <img src="/Home.svg" alt="menu icon" className="w-6 h-6 invert" />
        </button>

        <div className="flex h-full">
          <div className="flex-1" style={{ height: mapHeight }}>
            <MapContainer
              center={[22.74578914242589, 71.17492675781251]}
              key={layerKey}
              whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
              maxBounds={gujaratBounds}
              zoom={8}
              minZoom={8}
              maxZoom={30}
              scrollWheelZoom={true}
              bounceAtZoomLimits={false}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              ref={mapRef}
            >
              <>
                <ScaleControl position="bottomright" />
                <ZoomControl position="bottomright" />
                <LayersControl position="topright" className="mt-12">
                  <LayersControl.BaseLayer
                    checked={activeLayer === "empty"}
                    name="Canvas"
                  >
                    <TileLayer
                      url="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                      maxZoom={30}
                      attribution=""
                    />
                  </LayersControl.BaseLayer>

                  <LayersControl.BaseLayer
                    checked={activeLayer === "OpenStreetMap"}
                    name="OpenStreetMap"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      maxZoom={30}
                      attribution=""
                    />
                  </LayersControl.BaseLayer>

                  <LayersControl.BaseLayer
                    checked={activeLayer === "Satellite"}
                    name="Satellite"
                  >
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                      subdomains={["mt1", "mt2", "mt3"]}
                      maxZoom={30}
                    />
                  </LayersControl.BaseLayer>
                </LayersControl>
              </>

              {locations
                .filter((location) => {
                  const name = location.location_type?.trim().toLowerCase();
                  return ["transformer", "ctpt", "fuse", "switch"].includes(
                    name
                  );
                })
                .map((location) => {
                  const name = location.location_type?.trim().toLowerCase();
                  let icon = null;

                  const inspections =
                    inspectionDataBasedOnActionRequired?.inspections || [];

                  const inspection = inspections.find(
                    (inspection) => inspection.location_id == location.id
                  );

                  if (inspection) {
                    const actionRequired = inspection.actionrequired;

                    switch (name) {
                      case "transformer":
                        icon =
                          actionRequired === "immediate"
                            ? transformerImmediate
                            : actionRequired === "moderate"
                            ? transformerModerate
                            : transformerIcon;
                        break;
                      case "ctpt":
                        icon =
                          actionRequired === "immediate"
                            ? ctptImmediate
                            : actionRequired === "moderate"
                            ? ctptIconrModerate
                            : ctptIcon;
                        break;
                      case "switch":
                        icon =
                          actionRequired === "immediate"
                            ? switchIconImmediate
                            : actionRequired === "moderate"
                            ? switchIconModerate
                            : switchIcon;
                        break;
                      case "fuse":
                        icon =
                          actionRequired === "immediate"
                            ? fuseIconImmediate
                            : actionRequired === "moderate"
                            ? fuseIconModerate
                            : fuseIcon;
                        break;
                      default:
                        icon = null;
                    }
                  } else {
                    switch (name) {
                      case "transformer":
                        icon = transformerIcon;
                        break;
                      case "ctpt":
                        icon = ctptIcon;
                        break;
                      case "switch":
                        icon = switchIcon;
                        break;
                      case "fuse":
                        icon = fuseIcon;
                        break;
                      default:
                        icon = null;
                    }
                  }

                  return (
                    <Fragment key={location.id}>
                      {activeLocationId === location.id && (
                        <CircleMarker
                          center={[location.lat, location.lang]}
                          radius={18}
                          pathOptions={{
                            color: "red",
                            fillColor: "#facc15",
                            fillOpacity: 0.3,
                          }}
                        />
                      )}

                      <Marker
                        position={[location.lat, location.lang]}
                        icon={icon}
                        eventHandlers={{
                          click: () => {
                            setSelectedLocation(location);
                            setActiveLocationId(location.id);
                            setlocationForLeftSidebar(location.id);

                            if (mapRef.current) {
                              const point =
                                mapRef.current.latLngToContainerPoint(
                                  L.latLng(location.lat, location.lang)
                                );
                              setCustomPopupPosition(point);
                            }
                          },
                        }}
                      />
                    </Fragment>
                  );
                })}
            </MapContainer>
            <div>
              {activeLocationId && customPopupPosition && (
                <div
                  className="absolute z-[1000] bg-white border border-gray-300 rounded-lg shadow-md p-4"
                  style={{
                    left: `${customPopupPosition.x + 200}px`,
                    top: `${customPopupPosition.y + 100}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveLocationId(null);
                      setSelectedLocation(null);
                    }}
                    className="absolute top-1 right-2 text-gray-500 hover:text-red-500 font-bold text-xl leading-none"
                  >
                    &times;
                  </button>

                  <div className="text-[#385e72] font-bold text-lg mb-2">
                    {selectedLocation?.location_type}
                  </div>
                  <hr className="mb-2 border-[#b7cfdc]" />
                  <div>
                    <span className="font-semibold">Location ID:</span>{" "}
                    {selectedLocation?.id}
                  </div>
                  <div>
                    <span className="font-semibold">Parent ID:</span>{" "}
                    {selectedLocation?.parent_id}
                  </div>
                  <div>
                    <span className="font-semibold">Project ID:</span>{" "}
                    {selectedLocation?.project_id}
                  </div>
                  <div>
                    <span className="font-semibold"> Location Name:</span>{" "}
                    {selectedLocation?.location_name}
                  </div>
                  <button
                    onClick={() => {
                      setRightSidebarOpen(true);
                      setactionForRightsidebar("Latest Inspectin Data");
                      setlocationForRightSidebar(selectedLocation.id);
                    }}
                    className="text-sm px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded"
                  >
                    View Latest Record
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
