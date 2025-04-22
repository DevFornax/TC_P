import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  FuseWaypoints,
  FuseLines,
  FuseScale,
  FuseCustomIcons,
  FuseVisiblePointIds,
} from "../../SURVEY/sld-survey/DataFileForSLD";

const markedPoints = [
  "S1A",
  "S1B",
  "S1C",
  "L1A",
  "L1B",
  "L1C",
  "F1A",
  "F1B",
  "F1C",
  "DB",
  "TR",
  "TL",
];

const getThermalColor = (value) => {
  if (value === "H") return "red";
  if (value === "M") return "green";
  return null;
};

const FuseSldPrint = forwardRef(
  ({ thermalInspection = {}, locationId }, ref) => {
    const scale = FuseScale;
    const svgRef = useRef(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const getScaled = ([x, y]) => [x * scale, y * scale];

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      setDragOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    const thermalPointData = Object.entries(thermalInspection).reduce(
      (acc, [fullId, value]) => {
        const matchedPrefix = markedPoints.find((prefix) =>
          fullId.startsWith(prefix)
        );
        if (matchedPrefix) {
          acc[matchedPrefix] = value;
        }
        return acc;
      },
      {}
    );

    useImperativeHandle(ref, () => ({
     
      exportAsImage: () => {
        const svgElement = svgRef.current;
        if (!svgElement) return null;

        const svgString = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();

        return new Promise((resolve, reject) => {
          img.onload = () => {
            const A4_WIDTH = 794;
            const A4_HEIGHT = 700;

            const canvas = document.createElement("canvas");
            canvas.width = A4_WIDTH;
            canvas.height = A4_HEIGHT;

            const ctx = canvas.getContext("2d");

            const scale = Math.min(
              A4_WIDTH / img.width,
              A4_HEIGHT / img.height
            );

            const x = (A4_WIDTH - img.width * scale) / 2;
            const y = (A4_HEIGHT - img.height * scale) / 2;

            ctx.scale(scale, scale);
            ctx.drawImage(img, x / scale, y / scale);

            const png = canvas.toDataURL("image/png");
            resolve(png);
          };

          img.onerror = reject;

          img.src = `data:image/svg+xml;base64,${btoa(
            unescape(encodeURIComponent(svgString))
          )}`;
        });
      },
    }));

    return (
      <div className="w-full h-full">
        <svg
          ref={svgRef}
          viewBox="0 0 800 700"
          style={{
            background: "#fff",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
        

          {/* <g transform="translate(0, 60)">
            {" "}
            <text x={10} y={0} fontSize="16" fontWeight="bold">
              Thermal Inspection Status:
            </text>
            {Object.entries(thermalInspection).length === 0 ? (
              <text x={10} y={30} fontSize="14" fill="gray">
                Thermal Inspection: Not Done
              </text>
            ) : (
              Object.entries(thermalInspection).map(([id, status], index) => (
                <text
                  key={index}
                  x={10}
                  y={30 + index * 20}
                  fontSize="14"
                  fill={
                    status === "H" ? "red" : status === "M" ? "green" : "black"
                  }
                >
                  {id}:{" "}
                  {status === "H"
                    ? "High"
                    : status === "M"
                    ? "Medium"
                    : "No Data"}
                </text>
              ))
            )}
          </g> */}

          {/* <g transform={`translate(${dragOffset.x}, ${dragOffset.y})`}> */}
          <g transform="translate(180, 450)">
            {FuseLines.map((line) => {
              const [x1, y1] = getScaled(line.from);
              const [x2, y2] = getScaled(line.to);
              return (
                <line
                  key={line.id}
                  x1={x1}
                  y1={-y1}
                  x2={x2}
                  y2={-y2}
                  stroke="black"
                  strokeWidth={2}
                />
              );
            })}

            {FuseWaypoints.map((point) => {
              if (!FuseVisiblePointIds.includes(point.id)) return null;

              const [x, y] = getScaled(point.coordinates);
              const Icon = FuseCustomIcons[point.id];
              const thermalValue = thermalPointData[point.id];
              const thermalColor = getThermalColor(thermalValue);

              return (
                <g key={point.id}>
                  {Icon ? (
                    Icon(x, -y, () => console.log("Clicked", point.id))
                  ) : (
                    <circle
                      cx={x}
                      cy={-y}
                      r={6}
                      fill="#aaa"
                      stroke="#333"
                      strokeWidth={1.5}
                    />
                  )}

                  {thermalColor && (
                    <text
                      x={x + 10}
                      y={-y - 4}
                      fontSize={18}
                      fill={thermalColor}
                      fontWeight="bold"
                    >
                      {thermalValue}
                    </text>
                  )}

                  {point.id === "TD" && (
                    <g>
                      {[...Array(7)].map((_, i) => {
                        const dotMeta = [
                          { id: "TDU1", dx: -30, dy: 40 },
                          { id: "TDU2", dx: 0, dy: 40 },
                          { id: "TDU3", dx: 30, dy: 40 },
                          { id: "TDN", dx: -45, dy: 70 },
                          { id: "TDR", dx: -15, dy: 70 },
                          { id: "TDY", dx: 15, dy: 70 },
                          { id: "TDB", dx: 45, dy: 70 },
                        ][i];

                        const fullId = dotMeta.id + locationId;
                        const dotThermalValue = thermalInspection[fullId];
                        const dotThermalColor =
                          getThermalColor(dotThermalValue);

                        return (
                          <g key={dotMeta.id}>
                            <circle
                              cx={x + dotMeta.dx}
                              cy={-y + dotMeta.dy}
                              r={5}
                              fill={dotThermalColor || "#6cae4a"}
                              stroke="#4f6b3d"
                              strokeWidth={1}
                            />
                            <text
                              x={x + dotMeta.dx + 6}
                              y={-y + dotMeta.dy - 5}
                              fontSize="12"
                              fill={thermalColor}
                            >
                              {dotThermalValue}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
);

export default FuseSldPrint;
