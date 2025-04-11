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
  const [pointClickStates, setPointClickStates] = useState({});
const [thermalTDPoints, setThermalTDPoints] = useState([]);


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
        {/* {selection === "Transformer" && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 700 700"
            className="bg-white rounded shadow"
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

                let fillColor = "#6cae4a";
                let strokeColor = "#4f6b3d";

                if (wp.id.startsWith("L1")) {
                  fillColor = "#007BFF";
                  strokeColor = "#003F8A";
                } else if (wp.id.startsWith("F1")) {
                  fillColor = "#ff0080";
                  strokeColor = "#CC8400";
                } else if (wp.id.startsWith("S1")) {
                  fillColor = "#800080";
                  strokeColor = "#4B004B";
                } else if (wp.id === "TD") {
                  fillColor = "#28a745";
                  strokeColor = "#1c6b2f";
                } else if (wp.id === "SP") {
                  fillColor = "#FF69B4";
                  strokeColor = "#C71585";
                } else if (wp.id.startsWith("TL") || wp.id.startsWith("TR")) {
                  fillColor = "#00CED1";
                  strokeColor = "#008B8B";
                } else if (wp.id === "DB") {
                  fillColor = "#ff149d";
                  strokeColor = "#B8860B";
                }

                const clickState = pointClickStates[wp.id] || 0;
                if (clickState === 1) {
                  fillColor = "darkorange";
                  strokeColor = "orange";
                } else if (clickState === 2) {
                  fillColor = "red";
                  strokeColor = "red";
                }

                const handleClick = (id) => {
                  const nextClickState = ((pointClickStates[id] || 0) + 1) % 3;
                  setPointClickStates((prev) => ({
                    ...prev,
                    [id]: nextClickState,
                  }));

                
                  if (
                    [
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
                    ].includes(id)
                  ) {
                    let condition = "none";
                    if (nextClickState === 1) condition = "normal";
                    if (nextClickState === 2) condition = "high";

                    setSelectedPoint({
                      id: `${id}${locationID}`,
                      condition,
                    });
                  } else {
                    console.warn("Invalid ID clicked:", id);
                  }

                  if (id === "TD") {
                    const baseX = wp.coordinates[0] * Transformerscale;
                    const baseY = -wp.coordinates[1] * Transformerscale;

                    console.log("Base X:", baseX, "Base Y:", baseY); 

                    if (thermalTDPoints.length > 0) {
                      setThermalTDPoints([]);
                      console.log("Hiding thermal points");
                    } else {
                      const points = [
                        {
                          id: `TD1-${locationID}`,
                          x: baseX - 30,
                          y: baseY + 20,
                        },
                        { id: `TD2-${locationID}`, x: baseX, y: baseY + 20 },
                        {
                          id: `TD3-${locationID}`,
                          x: baseX + 30,
                          y: baseY + 20,
                        },

                      
                        {
                          id: `TD4-${locationID}`,
                          x: baseX - 45,
                          y: baseY + 50,
                        },
                        {
                          id: `TD5-${locationID}`,
                          x: baseX - 15,
                          y: baseY + 50,
                        },
                        {
                          id: `TD6-${locationID}`,
                          x: baseX + 15,
                          y: baseY + 50,
                        },
                        {
                          id: `TD7-${locationID}`,
                          x: baseX + 45,
                          y: baseY + 50,
                        },
                      ];

                      console.log("Thermal points being set:", points);
                      setThermalTDPoints(points); 
                    }
                  }

                 
                  
                };

                return (
                  <g key={wp.id}>
                    {CustomIcon ? (
                      CustomIcon(
                        cx,
                        cy,
                        () => handleClick(wp.id),
                        fillColor,
                        strokeColor
                      )
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={1}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(wp.id)}
                        onTouchStart={() => handleClick(wp.id)}
                      />
                    )}

                 
                    {wp.id === "TD" && thermalTDPoints.length > 0 && (
                      <g>
                        {thermalTDPoints.map((pt) => (
                          <circle
                            key={pt.id}
                            cx={pt.x}
                            cy={pt.y}
                            r={2}
                            fill="red"
                            style={{ pointerEvents: "none" }}
                          />
                        ))}
                      </g>
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
        )} */}

        {selection === "Transformer" && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 700 700"
            className="bg-white rounded shadow"
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

                let fillColor = "#6cae4a";
                let strokeColor = "#4f6b3d";

                if (wp.id.startsWith("L1")) {
                  fillColor = "#007BFF";
                  strokeColor = "#003F8A";
                } else if (wp.id.startsWith("F1")) {
                  fillColor = "#ff0080";
                  strokeColor = "#CC8400";
                } else if (wp.id.startsWith("S1")) {
                  fillColor = "#800080";
                  strokeColor = "#4B004B";
                } else if (wp.id === "TD") {
                  fillColor = "#28a745";
                  strokeColor = "#1c6b2f";
                } else if (wp.id === "SP") {
                  fillColor = "#FF69B4";
                  strokeColor = "#C71585";
                } else if (wp.id.startsWith("TL") || wp.id.startsWith("TR")) {
                  fillColor = "#00CED1";
                  strokeColor = "#008B8B";
                } else if (wp.id === "DB") {
                  fillColor = "#ff149d";
                  strokeColor = "#B8860B";
                }

                const clickState = pointClickStates[wp.id] || 0;
                if (clickState === 1) {
                  fillColor = "darkorange";
                  strokeColor = "orange";
                } else if (clickState === 2) {
                  fillColor = "red";
                  strokeColor = "red";
                }

                const handleClick = (id) => {
                  const nextClickState = ((pointClickStates[id] || 0) + 1) % 3;
                  setPointClickStates((prev) => ({
                    ...prev,
                    [id]: nextClickState,
                  }));

                  if (
                    [
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
                    ].includes(id)
                  ) {
                    let condition = "none";
                    if (nextClickState === 1) condition = "normal";
                    if (nextClickState === 2) condition = "high";

                    setSelectedPoint({
                      id: `${id}${locationID}`,
                      condition,
                    });
                  } else if (id.startsWith("TD")) {
                    // for thermal subpoints like TD1, TD2...
                    let condition = "none";
                    if (nextClickState === 1) condition = "normal";
                    if (nextClickState === 2) condition = "high";

                    setSelectedPoint({
                      id,
                      condition,
                    });
                  }

                  if (id === "TD") {
                    const baseX = wp.coordinates[0] * Transformerscale;
                    const baseY = -wp.coordinates[1] * Transformerscale;

                    if (thermalTDPoints.length > 0) {
                      setThermalTDPoints([]);
                    } else {
                      const points = [
                        {
                          id: "TDV1",
                          x: baseX - 30,
                          y: baseY + 20,
                        },
                        { id: "TDV2", x: baseX, y: baseY + 20 },
                        {
                          id: "TDV3",
                          x: baseX + 30,
                          y: baseY + 20,
                        },
                        {
                          id: "TDN",
                          x: baseX - 45,
                          y: baseY + 50,
                        },
                        {
                          id: "TDR",
                          x: baseX - 15,
                          y: baseY + 50,
                        },
                        {
                          id: "TDY",
                          x: baseX + 15,
                          y: baseY + 50,
                        },
                        {
                          id: "TDB",
                          x: baseX + 45,
                          y: baseY + 50,
                        },
                      ];
                      setThermalTDPoints(points);
                    }
                  }
                };

                return (
                  <g key={wp.id}>
                    {CustomIcon ? (
                      CustomIcon(
                        cx,
                        cy,
                        () => handleClick(wp.id),
                        fillColor,
                        strokeColor
                      )
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={1}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleClick(wp.id)}
                        onTouchStart={() => handleClick(wp.id)}
                      />
                    )}

                    {wp.id === "TD" && thermalTDPoints.length > 0 && (
                      <g>
                        {thermalTDPoints.map((pt) => {
                          const thermalState = pointClickStates[pt.id] || 0;
                          let fill = "#6cae4a";
                          let stroke = "#4f6b3d";

                          if (thermalState === 1) {
                            fill = "darkorange";
                            stroke = "orange";
                          } else if (thermalState === 2) {
                            fill = "red";
                            stroke = "red";
                          }

                          return (
                            <g key={pt.id}>
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={5}
                                fill={fill}
                                stroke={stroke}
                                strokeWidth={1}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleClick(pt.id)}
                              />
                              <text
                                x={pt.x + 5}
                                y={pt.y - 5}
                                fontSize="8"
                                fill="#333"
                              >
                                {pt.id}
                              </text>
                            </g>
                          );
                        })}
                      </g>
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
            className="bg-white rounded shadow"
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
                  const CustomIcon = switchCustomIcons[wp.id];

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

                  let fillColor = "#6cae4a";
                  let strokeColor = "#4f6b3d";

                  if (wp.id.startsWith("L1")) {
                    fillColor = "#007BFF";
                    strokeColor = "#003F8A";
                  } else if (wp.id.startsWith("F1")) {
                    fillColor = "#ff0080";
                    strokeColor = "#CC8400";
                  } else if (wp.id.startsWith("S1")) {
                    fillColor = "#800080";
                    strokeColor = "#4B004B";
                  } else if (wp.id === "TD") {
                    fillColor = "#28a745";
                    strokeColor = "#1c6b2f";
                  } else if (wp.id === "SP") {
                    fillColor = "#FF69B4";
                    strokeColor = "#C71585";
                  } else if (wp.id.startsWith("TL") || wp.id.startsWith("TR")) {
                    fillColor = "#00CED1";
                    strokeColor = "#008B8B";
                  } else if (wp.id === "DB") {
                    fillColor = "#ff149d";
                    strokeColor = "#B8860B";
                  }

                  const clickState = pointClickStates[wp.id] || 0;
                  if (clickState === 1) {
                    fillColor = "darkorange";
                    strokeColor = "orange";
                  } else if (clickState === 2) {
                    fillColor = "red";
                    strokeColor = "red";
                  }

                  const handleClick = (id) => {
                    setPointClickStates((prev) => {
                      const currentState = prev[id] || 0;
                      const nextState = (currentState + 1) % 3;
                      return {
                        ...prev,
                        [id]: nextState,
                      };
                    });

                    if (validIds.has(id)) {
                      const currentClickState = pointClickStates[id] || 0;
                      const nextClickState = (currentClickState + 1) % 3;

                      let condition = "none";
                      if (nextClickState === 1) condition = "normal";
                      else if (nextClickState === 2) condition = "high";

                      setSelectedPoint({
                        id: `${id}${locationID}`,
                        condition: condition,
                      });
                    } else {
                      console.log(`Invalid ID clicked: ${id}`);
                    }
                  };

                  return (
                    <g key={wp.id}>
                      {CustomIcon ? (
                        CustomIcon(
                          cx,
                          cy,
                          () => handleClick(wp.id),
                          fillColor,
                          strokeColor
                        )
                      ) : (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill={fillColor}
                          stroke={strokeColor}
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

                let fillColor = "#6cae4a";
                let strokeColor = "#4f6b3d";

                if (wp.id.startsWith("L1")) {
                  fillColor = "#007BFF";
                  strokeColor = "#003F8A";
                } else if (wp.id.startsWith("F1")) {
                  fillColor = "#ff0080";
                  strokeColor = "#CC8400";
                } else if (wp.id.startsWith("S1")) {
                  fillColor = "#800080";
                  strokeColor = "#4B004B";
                } else if (wp.id === "TD") {
                  fillColor = "#28a745";
                  strokeColor = "#1c6b2f";
                } else if (wp.id === "SP") {
                  fillColor = "#FF69B4";
                  strokeColor = "#C71585";
                } else if (wp.id.startsWith("TL") || wp.id.startsWith("TR")) {
                  fillColor = "#00CED1";
                  strokeColor = "#008B8B";
                } else if (wp.id === "DB") {
                  fillColor = "#ff149d";
                  strokeColor = "#B8860B";
                }

                const clickState = pointClickStates[wp.id] || 0;
                if (clickState === 1) {
                  fillColor = "darkorange";
                  strokeColor = "orange";
                } else if (clickState === 2) {
                  fillColor = "red";
                  strokeColor = "red";
                }

                const handleClick = (id) => {
                  setPointClickStates((prevStates) => {
                    const currentState = prevStates[id] || 0;
                    const nextState = (currentState + 1) % 3;
                    return {
                      ...prevStates,
                      [id]: nextState,
                    };
                  });

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
                    const currentClickState = pointClickStates[id] || 0;

                    const nextClickState = (currentClickState + 1) % 3;

                    let condition = "none";
                    let fillColor = "pink";

                    if (nextClickState === 1) {
                      condition = "normal";
                      fillColor = "orange";
                    } else if (nextClickState === 2) {
                      condition = "high";
                      fillColor = "red";
                    }

                    setPointClickStates((prev) => ({
                      ...prev,
                      [id]: nextClickState,
                    }));

                    setSelectedPoint({
                      id: `${id}${locationID}`,
                      condition: condition,
                    });
                  } else {
                    console.log(`Invalid ID clicked: ${id}`);
                  }
                };

                return (
                  <g key={wp.id}>
                    {CustomIcon ? (
                      CustomIcon(
                        cx,
                        cy,
                        () => handleClick(wp.id),
                        fillColor,
                        strokeColor
                      )
                    ) : (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={5}
                        fill={fillColor}
                        stroke={strokeColor}
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
