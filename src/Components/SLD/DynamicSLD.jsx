import React, { useEffect, useRef, useState } from "react";
import TCIcon from "./TCIcon";
import DotIcon from "./DotIcon";
import OTCIcon from "./OTCIcon";
import SPIcon from "./SPIcon";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../Topbar";

const waypoints = [
  { id: "A1", coordinates: [0, 0] },
  { id: "A2", coordinates: [0, 2] },
  { id: "A3", coordinates: [0, 4] },
  { id: "A4", coordinates: [0, 5] },
  { id: "A5", coordinates: [0, 6] },
  { id: "A_Underground", coordinates: [0, -3] },
  { id: "B1", coordinates: [8, 0] },
  { id: "B2", coordinates: [8, 2] },
  { id: "B3", coordinates: [8, 4] },
  { id: "B4", coordinates: [8, 5] },
  { id: "B5", coordinates: [8, 6] },
  { id: "B_Underground", coordinates: [8, -3] },
  { id: "LA1", coordinates: [2, 6] },
  { id: "LA2", coordinates: [4, 6] },
  { id: "LA3", coordinates: [6, 6] },
  { id: "SW1", coordinates: [2, 5] },
  { id: "SW2", coordinates: [4, 5] },
  { id: "SW3", coordinates: [6, 5] },
  { id: "FS1", coordinates: [2, 4] },
  { id: "FS2", coordinates: [4, 4] },
  { id: "FS3", coordinates: [6, 4] },
  { id: "TBC", coordinates: [4, 2] },
  { id: "SP", coordinates: [8, 1] },
];

const lines = [
  { id: "A_Overground", from: [0, 0], to: [0, 6] },
  { id: "A_Underground", from: [0, 0], to: [0, -3] },
  { id: "B_Overground", from: [8, 0], to: [8, 6] },
  { id: "B_Underground", from: [8, 0], to: [8, -3] },
  { id: "Line_LightningArrestorSupport", from: [0, 6], to: [8, 6] },
  { id: "Line_SwitchSupport", from: [0, 5], to: [8, 5] },
  { id: "Line_FuseSupport", from: [0, 4], to: [8, 4] },
  { id: "Line_TransformerSupport", from: [0, 2], to: [8, 2] },
  { id: "Base_Ground_Line", from: [-3, 0], to: [11, 0] },
  { id: "Load_stub", from: [4, 2.5], to: [4, 2.8] },
  { id: "Load_Xline", from: [4, 2.8], to: [10, 2.8] },
  { id: "Load_down", from: [10, 2.8], to: [10, -1] },
  { id: "Load_ground_3", from: [9.9, -0.8], to: [10.1, -0.8] },
  { id: "Load_ground_2", from: [9.8, -0.7], to: [10.2, -0.7] },
  { id: "Load_ground_1", from: [9.7, -0.6], to: [10.3, -0.6] },

  //optional
//    { id: "Load_stub", from: [4.3, 2.5], to: [4.3, 2.8] },
//  { id: "Load_Xline", from: [4.3, 2.8], to: [10, 2.8] },
//   { id: "CN1", from: [2, 4], to: [4, 2] },
//   { id: "CN2", from: [4, 4], to: [4, 2] },
//   { id: "CN3", from: [6, 4], to: [4, 2] },
];

const visiblePointIds = [
  "A_Underground",
  "B_Underground",
  "TBC",
  "SW1",
  "SW2",
  "SW3",
  "LA1",
  "LA2",
  "LA3",
  "FS1",
  "FS2",
  "FS3",
  "SP",
];

const scale = 50;

const customIcons = {
  SW1: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIcon width={20} height={20} />
    </g>
  ),
  SW2: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIcon width={20} height={20} />
    </g>
  ),
  SW3: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIcon width={20} height={20} />
    </g>
  ),

  FS1: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <TCIcon width={20} height={20} />
    </g>
  ),
  FS2: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <TCIcon width={20} height={20} />
    </g>
  ),

  FS3: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <TCIcon width={20} height={20} />
    </g>
  ),

  TBC: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 25})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <rect x={-5} y={-5} width={30} height={30} fill="transparent" />
      <OTCIcon width={20} height={20} />
    </g>
  ),

  SP: (x, y, onClick) => (
    <g
      transform={`translate(${x - 10}, ${y - 20})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SPIcon width={10} height={10} />
    </g>
  ),
};

const SLD = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const containerRef = useRef();
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 110, y: 410 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [selectedInfo, setSelectedInfo] = useState(null);

 const { locationID, selection } = location.state || {};

 useEffect(() => {
   // If locationID or selection are missing, redirect to home page
   if (!locationID || !selection) {
     navigate("/"); // Redirect to home page
   }
 }, [locationID, selection, navigate]);

  const handleWheel = (e) => {
    e.preventDefault();
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

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    // Similar to mouse down but for touch events
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

  const handleTouchEnd = () => setIsDragging(false);

  const resetView = () => {
    setZoom(1); // Reset zoom to initial value
    setOffset({ x: 110, y: 410 }); // Reset offset to initial position
  };

  return (
    // <div className="container-fluid">
    //   <h2>Location ID: {locationID}</h2>
    //   <h3>Selected Option: {selection}</h3>
    //   <div className="row">
    //     <div
    //       ref={containerRef}
    //       className="p-4 col-8"
    //       onMouseDown={handleMouseDown}
    //       onMouseMove={handleMouseMove}
    //       onMouseUp={handleMouseUp}
    //       onMouseLeave={handleMouseUp}
    //       onTouchStart={handleTouchStart}
    //       onTouchMove={handleTouchMove}
    //       onTouchEnd={handleTouchEnd}
    //       style={{
    //         // width: "100vw",
    //         // height: "100vh",
    //         overflow: "hidden",
    //         cursor: isDragging ? "grabbing" : "grab",
    //         userSelect: "none",
    //       }}
    //     >
    //       <svg
    //         width={700}
    //         height={700}
    //         className="border border-black bg-white rounded shadow"
    //       >
    //         <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
    //           {lines.map((line) => {
    //             const [x1, y1] = line.from;
    //             const [x2, y2] = line.to;

    //             let dashPattern = "none";
    //             if (
    //               line.id.includes("Underground") ||
    //               line.id === "Base_Ground_Line"
    //             ) {
    //               dashPattern = "2 2";
    //             }

    //             const isMainPoleLine =
    //               (line.id === "A_Overground" && x1 === 0 && x2 === 0) ||
    //               (line.id === "B_Overground" && x1 === 8 && x2 === 8);

    //             return (
    //               <line
    //                 key={line.id}
    //                 x1={x1 * scale}
    //                 y1={-y1 * scale}
    //                 x2={x2 * scale}
    //                 y2={-y2 * scale}
    //                 stroke={isMainPoleLine ? "#3498db" : "black"}
    //                 strokeWidth={isMainPoleLine ? 8 : 2}
    //                 strokeDasharray={dashPattern}
    //               />
    //             );
    //           })}

    //           {waypoints
    //             .filter((wp) => visiblePointIds.includes(wp.id))
    //             .map((wp) => {
    //               const [x, y] = wp.coordinates;
    //               const cx = x * scale;
    //               const cy = -y * scale;
    //               const CustomIcon = customIcons[wp.id];

    //               const handleClick = (id) => {
    //                 switch (id) {
    //                   case "TBC":
    //                     console.log("TBC point clicked 🚀");
    //                     alert("OIL based TC\nmade by: toshiba");

    //                     break;
    //                   case "A1":
    //                     console.log("A1 logic runs here 🔧");

    //                     break;
    //                   case "SW2":
    //                     console.log("Switch 2 clicked! ⚡");
    //                     alert("switc 2 clicked");

    //                     break;
    //                   case "SP":
    //                     setSelectedInfo({
    //                       id: "SP",
    //                       maintenance: "20/12/2024",
    //                       locationId: locationID,
    //                     });
    //                     break;
    //                   default:
    //                     console.log(`Default click for ${id}`);
    //                 }
    //               };

    //               return (
    //                 <g key={wp.id}>
    //                   {CustomIcon ? (
    //                     CustomIcon(cx, cy, () => handleClick(wp.id))
    //                   ) : (
    //                     <circle
    //                       cx={cx}
    //                       cy={cy}
    //                       r={5}
    //                       fill="#3498db"
    //                       stroke="black"
    //                       strokeWidth={1}
    //                       style={{ cursor: "pointer" }}
    //                       onClick={() => handleClick(wp.id)}
    //                       onTouchStart={() => handleClick(wp.id)}
    //                     />
    //                   )}

    //                   <text
    //                     x={wp.id === "TBC" ? cx + 22 : cx + 8}
    //                     y={cy - 6}
    //                     fontSize="10"
    //                     fill="#333"
    //                   >
    //                     {`${wp.id}${locationID}`}
    //                   </text>
    //                 </g>
    //               );
    //             })}
    //         </g>
    //       </svg>
    //     </div>

    //     <div className="col-4  p-4 mt-3   border border-black">
    //       {selectedInfo && (
    //         <>
    //           <h3 className="font-bold text-lg mb-2">Maintenance Info</h3>
    //           <p>
    //             <strong>ID:</strong> {selectedInfo.id}
    //           </p>
    //           <p>
    //             <strong>Location ID:</strong> {selectedInfo.locationId}
    //           </p>
    //           <p>
    //             <strong>Last Maitanance Date</strong> {selectedInfo.maintenance}
    //           </p>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <>
      <TopBar />
      <div className="container-fluid mx-auto max-h-screen px-4 overflow-auto">
        <h2 className="text-md font-semibold text-[#63667e] mt-4">
          Location ID:{" "}
          <span className="font-bold text-[#6c63ff]">{locationID}</span>
        </h2>

        <h3 className="text-md font-medium text-[#63667e] mb-6">
          Selected Option:{" "}
          <span className="font-semibold text-[#6c63ff]">{selection}</span>
        </h3>

        <div className="flex flex-col md:flex-row gap-4 border border-black">
          <div className="flex flex-col md:w-1/3 gap-4">
            <div
              ref={containerRef}
              className="flex-1 p-4 overflow-auto   relative"
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
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 700 700"
                className="border border-black bg-white rounded shadow"
              >
                <g
                  transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}
                >
                  {lines.map((line) => {
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
                        x1={x1 * scale}
                        y1={-y1 * scale}
                        x2={x2 * scale}
                        y2={-y2 * scale}
                        stroke={isMainPoleLine ? "#3498db" : "black"}
                        strokeWidth={isMainPoleLine ? 8 : 2}
                        strokeDasharray={dashPattern}
                      />
                    );
                  })}

                  {waypoints
                    .filter((wp) => visiblePointIds.includes(wp.id))
                    .map((wp) => {
                      const [x, y] = wp.coordinates;
                      const cx = x * scale;
                      const cy = -y * scale;
                      const CustomIcon = customIcons[wp.id];

                      const handleClick = (id) => {
                        switch (id) {
                          case "TBC":
                            console.log("TBC point clicked 🚀");
                            alert("OIL based TC\nmade by: toshiba");
                            break;
                          case "A1":
                            console.log("A1 logic runs here 🔧");
                            break;
                          case "SW2":
                            console.log("Switch 2 clicked! ⚡");
                            alert("switch 2 clicked");
                            break;
                          case "SP":
                            setSelectedInfo({
                              id: "SP",
                              maintenance: "20/12/2024",
                              locationId: locationID,
                            });
                            break;
                          default:
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
                            x={wp.id === "TBC" ? cx + 22 : cx + 8}
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
              <button
                onClick={resetView}
                className="absolute bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md sm:block md:block lg:hidden"
                style={{ zIndex: 1000 }}
              >
                Reset View
              </button>
            </div>

            <div className="p-4 border border-black overflow-auto">
              <h3 className="font-bold text-lg mb-2">Additional Information</h3>
            </div>
          </div>

          <div className="md:w-2/3 p-4 mt-3 border border-black md:mt-0 overflow-auto">
            {selectedInfo && (
              <>
                <h3 className="font-bold text-lg mb-2">Maintenance Info</h3>
                <p>
                  <strong>ID:</strong> {selectedInfo.id}
                </p>
                <p>
                  <strong>Location ID:</strong> {selectedInfo.locationId}
                </p>
                <p>
                  <strong>Last Maintenance Date:</strong>{" "}
                  {selectedInfo.maintenance}
                </p>
               
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SLD;
