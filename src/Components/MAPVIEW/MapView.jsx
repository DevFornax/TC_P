import React, { useState, useEffect, useRef ,Fragment } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  ZoomControl,
  ScaleControl,
  CircleMarker 
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
const gujaratBounds = [
  [19.1, 67.0],
  [25.6, 75.5],
];

export default function MapView() {
  const mapRef = useRef(null);
  const [LeftsidebarOpen, setLeftSidebarOpen] = useState(true);
  const [RightsidebarOpen, setRightSidebarOpen] = useState(false);
  const [mapHeight, setMapHeight] = useState("calc(100vh - 4px)");
  const [locations, setLocations] = useState([]);
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [activeLayer, setActiveLayer] = useState("OpenStreetMap");
  const [locationForRightSidebar, setlocationForRightSidebar] = useState(null);
  const [locationForLeftSidebar, setlocationForLeftSidebar] = useState(null);
  const [layerKey, setLayerKey] = useState(0);
  const [
    inspectionDataBasedOnActionRequired,
    setinspectionDataBasedOnActionRequired,
  ] = useState([]);

  const handleRefresh = () => {
    setLocations([]);
    setRightSidebarOpen(false);
    setLayerKey((prev) => prev + 1);
    setlocationForLeftSidebar(null)
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!LeftsidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!RightsidebarOpen);
  };

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
          locationIdFromMaptoLeftsidebar={locationForLeftSidebar} // 👈 pass the data here
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

        <div className="flex h-full">
          <div className="flex-1" style={{ height: mapHeight }}>
            <MapContainer
              center={[22.74578914242589, 71.17492675781251]}
              key={layerKey}
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
                  console.log(location)
                  return (
                    // <Marker
                    //   key={location.id}
                    //   position={[location.lat, location.lang]}
                    //   icon={icon}
                    // >
                    //   <Popup
                    //     className="custom-leaflet-popup"
                    //     eventHandlers={{
                    //       add: () => {
                    //         setlocationForLeftSidebar(location.id);
                    //       },
                    //     }}
                    //   >
                    //     <div className="p-3 text-sm text-[#385e72] bg-[#d9e4ec] rounded-md space-y-2 shadow-md relative">
                    //       <div className="flex justify-between items-center">
                    //         <div className="font-semibold text-lg text-[#385e72]">
                    //           {location.location_type}
                    //         </div>
                    //         <div className="relative">
                    //           <button
                    //             className="text-[#385e72] mr-5 hover:text-[#6aabd2] focus:outline-none"
                    //             onClick={(e) => {
                    //               e.stopPropagation();
                    //               setActiveLocationId((prev) =>
                    //                 prev === location.id ? null : location.id
                    //               );
                    //             }}
                    //           >
                    //             ⋮
                    //           </button>

                    //           {activeLocationId === location.id && (
                    //             <div className="absolute left-8 mt-6 w-28 bg-white border border-gray-200 rounded shadow-md z-10">
                    //               <ul className="text-sm text-gray-700">
                    //                 <li
                    //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    //                   onClick={() => handleEdit(location.id)}
                    //                 >
                    //                   ✏️ Edit
                    //                 </li>
                    //                 <li
                    //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    //                   onClick={() => handleDelete(location.id)}
                    //                 >
                    //                   🗑️ Delete
                    //                 </li>
                    //                 <li
                    //                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    //                   onClick={() => {
                    //                     toggleRightSidebar();
                    //                     setlocationForRightSidebar(location.id);
                    //                   }}
                    //                 >
                    //                   Open Right Sidebar
                    //                 </li>
                    //               </ul>
                    //             </div>
                    //           )}
                    //         </div>
                    //       </div>

                    //       <hr className="border-[#b7cfdc]" />

                    //       <div className="">
                    //         <span className="font-medium text-[#6aabd2]">
                    //           Location ID:
                    //         </span>{" "}
                    //         {location.id}
                    //       </div>
                    //       <div className="">
                    //         <span className="font-medium text-[#6aabd2]">
                    //           Parent ID:{" "}
                    //         </span>
                    //         {location.parent_id}
                    //       </div>

                    //       <div>
                    //         <span className="font-medium text-[#6aabd2]">
                    //           Project ID:{" "}
                    //         </span>
                    //         {location.project_id}
                    //       </div>
                    //       <div>
                    //         <span className="font-medium text-[#6aabd2]">
                    //           Location Name:{" "}
                    //         </span>
                    //         {location.location_name}
                    //       </div>
                    //     </div>
                    //   </Popup>

                    // </Marker>

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
                            setActiveLocationId(location.id); 
                          },
                        }}
                      >
                        <Popup
                          className="custom-leaflet-popup"
                          eventHandlers={{
                            add: () => {
                              setlocationForLeftSidebar(location.id);
                            },
                          }}
                        >
                          
                          <div className="p-3 text-sm text-[#385e72] bg-[#d9e4ec] rounded-md space-y-2 shadow-md relative">
                            <div className="flex justify-between items-center">
                              <div className="font-semibold text-lg text-[#385e72]">
                                {location.location_type}
                              </div>
                              <div className="relative">
                                <button
                                  className="text-[#385e72] mr-5 hover:text-[#6aabd2] focus:outline-none"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // setActiveLocationId((prev) =>
                                    //   prev === location.id ? null : location.id
                                    // );
                                  }}
                                >
                                  ⋮
                                </button>

                                {activeLocationId === location.id && (
                                  <div className="absolute left-8 mt-6 w-28 bg-white border border-gray-200 rounded shadow-md z-10">
                                    <ul className="text-sm text-gray-700">
                                      <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleEdit(location.id)}
                                      >
                                        ✏️ Edit
                                      </li>
                                      <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                          handleDelete(location.id)
                                        }
                                      >
                                        🗑️ Delete
                                      </li>
                                      <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                          toggleRightSidebar();
                                          setlocationForRightSidebar(
                                            location.id
                                          );
                                        }}
                                      >
                                        Open Right Sidebar
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>

                            <hr className="border-[#b7cfdc]" />

                            <div>
                              <span className="font-medium text-[#6aabd2]">
                                Location ID:
                              </span>{" "}
                              {location.id}
                            </div>
                            <div>
                              <span className="font-medium text-[#6aabd2]">
                                Parent ID:{" "}
                              </span>
                              {location.parent_id}
                            </div>
                            <div>
                              <span className="font-medium text-[#6aabd2]">
                                Project ID:{" "}
                              </span>
                              {location.project_id}
                            </div>
                            <div>
                              <span className="font-medium text-[#6aabd2]">
                                Location Name:{" "}
                              </span>
                              {location.location_name}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    </Fragment>
                  );
                })}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}
