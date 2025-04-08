

import React, { useEffect, useRef, useState } from "react";
import TCIcon from "./TCIcon";
import DotIcon from "./DotIcon";
import OTCIcon from "./OTCIcon";
import SPIcon from "./SPIcon";

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

const SLD = ({locationId}) => {
  const containerRef = useRef();
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 110, y: 410 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

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



  
  return (
    <div
      ref={containerRef}
      className="container border border-black flex justify-center items-center p-4"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        // width: "100vw",
        // height: "100vh",
        overflow: "hidden",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      <svg
        width={700}
        height={700}
        className="border border-black bg-white rounded shadow"
      >
        <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
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
                    alert("OIL based TC");

                    break;
                  case "A1":
                    console.log("A1 logic runs here 🔧");

                    break;
                  case "SW2":
                    console.log("Switch 2 clicked! ⚡");
                    alert("switc 2 clicked");

                    break;
                  case "SP":
                    alert("sp clicked");
                    console.log("sp clicked");
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
                    />
                  )}

                  {/* <text
                    x={wp.id === "TBC" ? cx + 22 : cx + 8}
                    y={cy - 6}
                    fontSize="10"
                    fill="#333"
                  >
                    {wp.id}
                  </text> */}
                  <text
                    x={wp.id === "TBC" ? cx + 22 : cx + 8}
                    y={cy - 6}
                    fontSize="10"
                    fill="#333"
                  >
                    {`${wp.id}${locationId}`}
                  </text>
                </g>
              );
            })}
        </g>
      </svg>
     
    </div>
  );
};

export default SLD;


  