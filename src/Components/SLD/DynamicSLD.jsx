// import React, { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import TopBar from "../Topbar";
// import {
//   Transformerlines,
//   Transformerscale,
//   TransformervisiblePointIds,
//   Transformerwaypoints,
//   TransformercustomIcons,
//   switchLines,
//   SwitchScale,
//   switchVisiblePointIds,
//   switchCustomIcons,
//   switchWaypoints,
//   FuseLines,
//   FuseScale,
//   FuseVisiblePointIds,
//   FuseWaypoints,
//   FuseCustomIcons,
// } from "./DataFileForSLD";

// import MaintenancePage from "../Dashboard/Dashboard";
// import Dashboard from "../Dashboard/Dashboard";

// const SLD = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const containerRef = useRef();
//   const [zoom, setZoom] = useState(1);
//   const [offset, setOffset] = useState({ x: 110, y: 410 });
//   const [isDragging, setIsDragging] = useState(false);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const [locationData, setLocationData] = useState(null);
//   const [selectedPoint, setselectedPoint] = useState(null);
//   const [locationIDforchild, setLocationIDforchild] = useState("");
//   const [error, setError] = useState("");
//   const handleMouseUp = () => setIsDragging(false);
//   const handleTouchEnd = () => setIsDragging(false);
//   const { locationID, selection: navSelection } = location.state || {};
//   const [selection, setSelection] = useState(navSelection || "Select");

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!locationID || !selection) {
//         navigate("/");
//         return;
//       }
//       try {
//         const token = localStorage.getItem("token");
//         const API_URL = import.meta.env.VITE_API_BASE_URL;
//         const res = await fetch(`${API_URL}/get-location-data`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ location_id: locationID }),
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           setError(data.message || "Location not found");
//           return;
//         }
//         setLocationIDforchild(locationID);
//         setLocationData(data);
//         console.log(data, "api called from sld");
//       } catch (err) {
//         console.error("SLD Page API error:", err);
//         setError("Something went wrong while loading SLD.");
//       }
//     };
//     fetchData();
//   }, [locationID, selection, navigate]);

//   useEffect(() => {
//     const container = containerRef.current;
//     const preventPullToRefresh = (e) => {
//       if (container.scrollTop === 0 && e.touches[0].clientY > 0) {
//         e.preventDefault();
//       }
//     };
//     container.addEventListener("touchmove", preventPullToRefresh, {
//       passive: false,
//     });
//     return () => {
//       container.removeEventListener("touchmove", preventPullToRefresh);
//     };
//   }, []);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const delta = e.deltaY < 0 ? 0.1 : -0.1;
//     setZoom((prev) => Math.max(0.2, prev + delta));
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     container.addEventListener("wheel", handleWheel, { passive: false });
//     return () => {
//       container.removeEventListener("wheel", handleWheel);
//     };
//   }, []);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setOffset({
//         x: e.clientX - dragStart.current.x,
//         y: e.clientY - dragStart.current.y,
//       });
//     }
//   };

//   const handleTouchStart = (e) => {
//     setIsDragging(true);
//     dragStart.current = {
//       x: e.touches[0].clientX - offset.x,
//       y: e.touches[0].clientY - offset.y,
//     };
//   };

//   const handleTouchMove = (e) => {
//     if (isDragging) {
//       setOffset({
//         x: e.touches[0].clientX - dragStart.current.x,
//         y: e.touches[0].clientY - dragStart.current.y,
//       });
//     }
//   };

//   const resetView = () => {
//     setZoom(1);
//     setOffset({ x: 110, y: 410 });
//   };

//   return (
//     <>
//       <TopBar />
//       <div className="container-fluid mx-auto p-3">
//         <div className="flex flex-col md:flex-row xl:w-full gap-4 mt-4">
//           <div className="w-full xl:w-1/3 flex flex-col  xl:h-[700px] xl:sticky xl:top-4 overflow-auto border border-gray-300 rounded-xl shadow-lg">
//             <h2 className="text-2xl p-4 pt-6 font-bold text-[#6c63ff] mb-4 sm:mb-0">
//               {selection}
//             </h2>
//             <div
//               ref={containerRef}
//               className="flex-1   relative"
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseUp}
//               onTouchStart={handleTouchStart}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={handleTouchEnd}
//               style={{
//                 overflow: "auto",
//                 cursor: isDragging ? "grabbing" : "grab",
//                 userSelect: "none",
//               }}
//             >
//               {selection === "Transformer" && (
//                 <svg
//                   width="100%"
//                   height="100%"
//                   viewBox="0 0 700 700"
//                   className=" bg-white rounded shadow"
//                 >
//                   <g
//                     transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}
//                   >
//                     {Transformerlines.map((line) => {
//                       const [x1, y1] = line.from;
//                       const [x2, y2] = line.to;

//                       let dashPattern = "none";
//                       if (
//                         line.id.includes("Underground") ||
//                         line.id === "Base_Ground_Line"
//                       ) {
//                         dashPattern = "2 2";
//                       }

//                       const isMainPoleLine =
//                         (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
//                         (line.id === "B_Overground" && x1 === 8 && x2 === 8);

//                       return (
//                         <line
//                           key={line.id}
//                           x1={x1 * Transformerscale}
//                           y1={-y1 * Transformerscale}
//                           x2={x2 * Transformerscale}
//                           y2={-y2 * Transformerscale}
//                           stroke={isMainPoleLine ? "#3498db" : "black"}
//                           strokeWidth={isMainPoleLine ? 8 : 2}
//                           strokeDasharray={dashPattern}
//                         />
//                       );
//                     })}

//                     {Transformerwaypoints.filter((wp) =>
//                       TransformervisiblePointIds.includes(wp.id)
//                     ).map((wp) => {
//                       const [x, y] = wp.coordinates;
//                       const cx = x * Transformerscale;
//                       const cy = -y * Transformerscale;
//                       const CustomIcon = TransformercustomIcons[wp.id];

//                       const handleClick = (id) => {
//                         const validIds = new Set([
//                           "TD",
//                           "L1A",
//                           "L1B",
//                           "L1C",
//                           "S1A",
//                           "S1B",
//                           "S1C",
//                           "SP",
//                           "F1A",
//                           "F1B",
//                           "F1C",
//                           "TL",
//                           "TR",
//                           "DB",
//                         ]);

//                         if (validIds.has(id)) {
//                           setselectedPoint({
//                             id: `${wp.id}${locationIDforchild}`,
//                           });
//                         } else {
//                           console.log(`Default click for ${id}`);
//                         }
//                       };

//                       return (
//                         <g key={wp.id}>
//                           {CustomIcon ? (
//                             CustomIcon(cx, cy, () => handleClick(wp.id))
//                           ) : (
//                             <circle
//                               cx={cx}
//                               cy={cy}
//                               r={5}
//                               fill="#3498db"
//                               stroke="black"
//                               strokeWidth={1}
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleClick(wp.id)}
//                               onTouchStart={() => handleClick(wp.id)}
//                             />
//                           )}

//                           <text
//                             x={wp.id === "TD" ? cx + 22 : cx + 8}
//                             y={cy - 6}
//                             fontSize="10"
//                             fill="#333"
//                           >
//                             {`${wp.id}${locationIDforchild}`}
//                           </text>
//                         </g>
//                       );
//                     })}
//                   </g>
//                 </svg>
//               )}

//               {selection === "Switch" && (
//                 <svg
//                   width="100%"
//                   height="100%"
//                   viewBox="0 0 700 700"
//                   className=" bg-white rounded shadow"
//                 >
//                   <g
//                     transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}
//                   >
//                     {switchLines.map((line) => {
//                       const [x1, y1] = line.from;
//                       const [x2, y2] = line.to;

//                       let dashPattern = "none";
//                       if (
//                         line.id.includes("Underground") ||
//                         line.id === "Base_Ground_Line"
//                       ) {
//                         dashPattern = "2 2";
//                       }

//                       const isMainPoleLine =
//                         (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
//                         (line.id === "B_Overground" && x1 === 8 && x2 === 8);

//                       return (
//                         <line
//                           key={line.id}
//                           x1={x1 * SwitchScale}
//                           y1={-y1 * SwitchScale}
//                           x2={x2 * SwitchScale}
//                           y2={-y2 * SwitchScale}
//                           stroke={isMainPoleLine ? "#3498db" : "black"}
//                           strokeWidth={isMainPoleLine ? 8 : 2}
//                           strokeDasharray={dashPattern}
//                         />
//                       );
//                     })}

//                     {switchWaypoints
//                       .filter((wp) => switchVisiblePointIds.includes(wp.id))
//                       .map((wp) => {
//                         const [x, y] = wp.coordinates;
//                         const cx = x * SwitchScale;
//                         const cy = -y * SwitchScale;
//                         const CustomIcon = switchCustomIcons[wp.id]; // ← valid check

//                         const handleClick = (id) => {
//                           const validIds = new Set([
//                             "TD",
//                             "L1A",
//                             "L1B",
//                             "L1C",
//                             "S1A",
//                             "S1B",
//                             "S1C",
//                             "SP",
//                             "F1A",
//                             "F1B",
//                             "F1C",
//                             "TL",
//                             "TR",
//                             "DB",
//                           ]);
//                           if (validIds.has(id)) {
//                             setselectedPoint({
//                               id: `${wp.id}${locationIDforchild}`,
//                             });
//                           } else {
//                             console.log(`Default click for ${id}`);
//                           }
//                         };

//                         return (
//                           <g key={wp.id}>
//                             {CustomIcon ? (
//                               CustomIcon(cx, cy, () => handleClick(wp.id))
//                             ) : (
//                               <circle
//                                 cx={cx}
//                                 cy={cy}
//                                 r={5}
//                                 fill="#3498db"
//                                 stroke="black"
//                                 strokeWidth={1}
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() => handleClick(wp.id)}
//                                 onTouchStart={() => handleClick(wp.id)}
//                               />
//                             )}
//                             <text
//                               x={wp.id === "TD" ? cx + 22 : cx + 8}
//                               y={cy - 6}
//                               fontSize="10"
//                               fill="#333"
//                             >
//                               {`${wp.id}${locationIDforchild}`}
//                             </text>
//                           </g>
//                         );
//                       })}
//                   </g>
//                 </svg>
//               )}

//               {selection === "Fuse" && (
//                 <svg
//                   width="100%"
//                   height="100%"
//                   viewBox="0 0 700 700"
//                   className="bg-white rounded shadow"
//                 >
//                   <g
//                     transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}
//                   >
//                     {FuseLines.map((line) => {
//                       const [x1, y1] = line.from;
//                       const [x2, y2] = line.to;

//                       let dashPattern = "none";
//                       if (
//                         line.id.includes("Underground") ||
//                         line.id === "Base_Ground_Line"
//                       ) {
//                         dashPattern = "2 2";
//                       }

//                       const isMainPoleLine =
//                         (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
//                         (line.id === "B_Overground" && x1 === 8 && x2 === 8);

//                       return (
//                         <line
//                           key={line.id}
//                           x1={x1 * FuseScale}
//                           y1={-y1 * FuseScale}
//                           x2={x2 * FuseScale}
//                           y2={-y2 * FuseScale}
//                           stroke={isMainPoleLine ? "#3498db" : "black"}
//                           strokeWidth={isMainPoleLine ? 8 : 2}
//                           strokeDasharray={dashPattern}
//                         />
//                       );
//                     })}

//                     {FuseWaypoints.filter((wp) =>
//                       FuseVisiblePointIds.includes(wp.id)
//                     ).map((wp) => {
//                       const [x, y] = wp.coordinates;
//                       const cx = x * FuseScale;
//                       const cy = -y * FuseScale;
//                       const CustomIcon = FuseCustomIcons[wp.id];

//                       const handleClick = (id) => {
//                         const validIds = new Set([
//                           "TD",
//                           "L1A",
//                           "L1B",
//                           "L1C",
//                           "S1A",
//                           "S1B",
//                           "S1C",
//                           "SP",
//                           "F1A",
//                           "F1B",
//                           "F1C",
//                           "TL",
//                           "TR",
//                           "DB",
//                         ]);
//                         if (validIds.has(id)) {
//                           setselectedPoint({
//                             id: `${wp.id}${locationIDforchild}`,
//                           });
//                         } else {
//                           console.log(`Default click for ${id}`);
//                         }
//                       };

//                       return (
//                         <g key={wp.id}>
//                           {CustomIcon ? (
//                             CustomIcon(cx, cy, () => handleClick(wp.id))
//                           ) : (
//                             <circle
//                               cx={cx}
//                               cy={cy}
//                               r={5}
//                               fill="#3498db"
//                               stroke="black"
//                               strokeWidth={1}
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleClick(wp.id)}
//                               onTouchStart={() => handleClick(wp.id)}
//                             />
//                           )}
//                           <text
//                             x={wp.id === "TD" ? cx + 22 : cx + 8}
//                             y={cy - 6}
//                             fontSize="10"
//                             fill="#333"
//                           >
//                             {`${wp.id}${locationIDforchild}`}
//                           </text>
//                         </g>
//                       );
//                     })}
//                   </g>
//                 </svg>
//               )}

//               <div
//                 className="absolute bottom-4 right-4 flex flex-col items-center gap-4 p-4 border border-black bg-white rounded-lg sm:block md:block lg:hidden"
//                 style={{
//                   zIndex: 1000,
//                   touchAction: "manipulation",
//                 }}
//               >
//                 <button
//                   onClick={() => setZoom((prev) => Math.min(prev + 0.1, 5))}
//                   className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
//                   title="Zoom In"
//                 >
//                   <img src="/zoomin.svg" alt="" />
//                 </button>

//                 <button
//                   onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.2))}
//                   className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
//                   title="Zoom Out"
//                 >
//                   <img src="/zoomout.svg" alt="" />
//                 </button>

//                 <button
//                   onClick={resetView}
//                   className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
//                   title="Reset View"
//                 >
//                   <img src="/reset.svg" alt="" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="w-full xl:w-2/3  md:mt-0 overflow-auto">
//             <Dashboard
//               locationdata={locationData}
//               selectedPoint={selectedPoint}
//               setLocationData={setLocationData}
//               setselectedPoint={setselectedPoint}
//               setLocationIDforchild={setLocationIDforchild}
//               selection={selection}
//               setSelection={setSelection}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SLD;

import React, { useEffect, useRef, useState } from "react";

import {
  Transformerlines,
  Transformerscale,
  TransformervisiblePointIds,
  Transformerwaypoints,
  TransformercustomIcons,
  switchLines,
  SwitchScale,
  switchVisiblePointIds,
  switchCustomIcons,
  switchWaypoints,
  FuseLines,
  FuseScale,
  FuseVisiblePointIds,
  FuseWaypoints,
  FuseCustomIcons,
} from "./DataFileForSLD";

const SLD = ({ locationID, selection, setSelectedPoint }) => {
  const containerRef = useRef();
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 110, y: 410 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    const container = containerRef.current;
    const preventPullToRefresh = (e) => {
      if (container.scrollTop === 0 && e.touches[0].clientY > 0) {
        e.preventDefault();
      }
    };
    container.addEventListener("touchmove", preventPullToRefresh, {
      passive: false,
    });
    return () => {
      container.removeEventListener("touchmove", preventPullToRefresh);
    };
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => Math.max(0.2, prev + delta));
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.touches[0].clientX - offset.x,
      y: e.touches[0].clientY - offset.y,
    };
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setOffset({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      });
    }
  };

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 110, y: 410 });
  };

  return (
    <>
      <h2 className="text-2xl p-4 pt-6 font-bold text-[#6c63ff] mb-4 sm:mb-0">
        {selection}
      </h2>
      <div
        ref={containerRef}
        className="flex-1   relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          overflow: "auto",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        {selection === "Transformer" && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 700 700"
            className=" bg-white rounded shadow"
          >
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
              {Transformerlines.map((line) => {
                const [x1, y1] = line.from;
                const [x2, y2] = line.to;

                let dashPattern = "none";
                if (
                  line.id.includes("Underground") ||
                  line.id === "Base_Ground_Line"
                ) {
                  dashPattern = "2 2";
                }

                const isMainPoleLine =
                  (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
                  (line.id === "B_Overground" && x1 === 8 && x2 === 8);
                const isLoadLine =
                  line.id === "LOADCONNECTORTC" ||
                  line.id === "LOADYLINE" ||
                  line.id === "LOADXLINE" ||
                  line.id === "LDG1" ||
                  line.id === "LDG2" ||
                  line.id === "LDG3";
                return (
                  <line
                    key={line.id}
                    x1={x1 * Transformerscale}
                    y1={-y1 * Transformerscale}
                    x2={x2 * Transformerscale}
                    y2={-y2 * Transformerscale}
                    stroke={
                      isMainPoleLine ? "#3498db" : isLoadLine ? "gray" : "black"
                    }
                    strokeWidth={isMainPoleLine ? 8 : 2}
                    strokeDasharray={dashPattern}
                  />
                );
              })}

              {Transformerwaypoints.filter((wp) =>
                TransformervisiblePointIds.includes(wp.id)
              ).map((wp) => {
                const [x, y] = wp.coordinates;
                const cx = x * Transformerscale;
                const cy = -y * Transformerscale;
                const CustomIcon = TransformercustomIcons[wp.id];

                const handleClick = (id) => {
                  const validIds = new Set([
                    "TD",
                    "L1A",
                    "L1B",
                    "L1C",
                    "S1A",
                    "S1B",
                    "S1C",
                    "SP",
                    "F1A",
                    "F1B",
                    "F1C",
                    "TL",
                    "TR",
                    "DB",
                  ]);

                  if (validIds.has(id)) {
                    setSelectedPoint({
                      id: `${wp.id}${locationID}`,
                    });
                  } else {
                    console.log(`Default click for ${id}`);
                  }
                };

                return (
                  <g key={wp.id}>
                    {CustomIcon ? (
                      CustomIcon(cx, cy, () => handleClick(wp.id))
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#3498db"
                        stroke="black"
                        strokeWidth={1}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(wp.id)}
                        onTouchStart={() => handleClick(wp.id)}
                      />
                    )}

                    <text
                      x={wp.id === "TD" ? cx + 22 : cx + 8}
                      y={cy - 6}
                      fontSize="10"
                      fill="#333"
                    >
                      {`${wp.id}${locationID}`}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        )}

        {selection === "Switch" && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 700 700"
            className=" bg-white rounded shadow"
          >
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
              {switchLines.map((line) => {
                const [x1, y1] = line.from;
                const [x2, y2] = line.to;

                let dashPattern = "none";
                if (
                  line.id.includes("Underground") ||
                  line.id === "Base_Ground_Line"
                ) {
                  dashPattern = "2 2";
                }

                const isMainPoleLine =
                  (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
                  (line.id === "B_Overground" && x1 === 8 && x2 === 8);

                return (
                  <line
                    key={line.id}
                    x1={x1 * SwitchScale}
                    y1={-y1 * SwitchScale}
                    x2={x2 * SwitchScale}
                    y2={-y2 * SwitchScale}
                    stroke={isMainPoleLine ? "#3498db" : "black"}
                    strokeWidth={isMainPoleLine ? 8 : 2}
                    strokeDasharray={dashPattern}
                  />
                );
              })}

              {switchWaypoints
                .filter((wp) => switchVisiblePointIds.includes(wp.id))
                .map((wp) => {
                  const [x, y] = wp.coordinates;
                  const cx = x * SwitchScale;
                  const cy = -y * SwitchScale;
                  const CustomIcon = switchCustomIcons[wp.id]; // ← valid check

                  const handleClick = (id) => {
                    const validIds = new Set([
                      "TD",
                      "L1A",
                      "L1B",
                      "L1C",
                      "S1A",
                      "S1B",
                      "S1C",
                      "SP",
                      "F1A",
                      "F1B",
                      "F1C",
                      "TL",
                      "TR",
                      "DB",
                    ]);
                    if (validIds.has(id)) {
                      setSelectedPoint({
                        id: `${wp.id}${locationID}`,
                      });
                    } else {
                      console.log(`Default click for ${id}`);
                    }
                  };

                  return (
                    <g key={wp.id}>
                      {CustomIcon ? (
                        CustomIcon(cx, cy, () => handleClick(wp.id))
                      ) : (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill="#3498db"
                          stroke="black"
                          strokeWidth={1}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleClick(wp.id)}
                          onTouchStart={() => handleClick(wp.id)}
                        />
                      )}
                      <text
                        x={wp.id === "TD" ? cx + 22 : cx + 8}
                        y={cy - 6}
                        fontSize="10"
                        fill="#333"
                      >
                        {`${wp.id}${locationID}`}
                      </text>
                    </g>
                  );
                })}
            </g>
          </svg>
        )}

        {selection === "Fuse" && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 700 700"
            className="bg-white rounded shadow"
          >
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
              {FuseLines.map((line) => {
                const [x1, y1] = line.from;
                const [x2, y2] = line.to;

                let dashPattern = "none";
                if (
                  line.id.includes("Underground") ||
                  line.id === "Base_Ground_Line"
                ) {
                  dashPattern = "2 2";
                }

                const isMainPoleLine =
                  (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
                  (line.id === "B_Overground" && x1 === 8 && x2 === 8);

                return (
                  <line
                    key={line.id}
                    x1={x1 * FuseScale}
                    y1={-y1 * FuseScale}
                    x2={x2 * FuseScale}
                    y2={-y2 * FuseScale}
                    stroke={isMainPoleLine ? "#3498db" : "black"}
                    strokeWidth={isMainPoleLine ? 8 : 2}
                    strokeDasharray={dashPattern}
                  />
                );
              })}

              {FuseWaypoints.filter((wp) =>
                FuseVisiblePointIds.includes(wp.id)
              ).map((wp) => {
                const [x, y] = wp.coordinates;
                const cx = x * FuseScale;
                const cy = -y * FuseScale;
                const CustomIcon = FuseCustomIcons[wp.id];

                const handleClick = (id) => {
                  const validIds = new Set([
                    "TD",
                    "L1A",
                    "L1B",
                    "L1C",
                    "S1A",
                    "S1B",
                    "S1C",
                    "SP",
                    "F1A",
                    "F1B",
                    "F1C",
                    "TL",
                    "TR",
                    "DB",
                  ]);
                  if (validIds.has(id)) {
                    setSelectedPoint({
                      id: `${wp.id}${locationID}`,
                    });
                  } else {
                    console.log(`Default click for ${id}`);
                  }
                };

                return (
                  <g key={wp.id}>
                    {CustomIcon ? (
                      CustomIcon(cx, cy, () => handleClick(wp.id))
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill="#3498db"
                        stroke="black"
                        strokeWidth={1}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(wp.id)}
                        onTouchStart={() => handleClick(wp.id)}
                      />
                    )}
                    <text
                      x={wp.id === "TD" ? cx + 22 : cx + 8}
                      y={cy - 6}
                      fontSize="10"
                      fill="#333"
                    >
                      {`${wp.id}${locationID}`}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        )}

        <div
          className="absolute bottom-4 right-4 flex flex-col items-center gap-4 p-4 border border-black bg-white rounded-lg sm:block md:block lg:hidden"
          style={{
            zIndex: 1000,
            touchAction: "manipulation",
          }}
        >
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 0.1, 5))}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
            title="Zoom In"
          >
            <img src="/zoomin.svg" alt="" />
          </button>

          <button
            onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.2))}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            title="Zoom Out"
          >
            <img src="/zoomout.svg" alt="" />
          </button>

          <button
            onClick={resetView}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            title="Reset View"
          >
            <img src="/reset.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SLD;
