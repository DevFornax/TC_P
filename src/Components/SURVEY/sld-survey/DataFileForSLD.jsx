import TCIcon from "../../utils/SquareIconForFuse";
// import DotIcon from "../utils/DotIcon";
import OTCIcon from "../../utils/OTCIcon";
import SPIcon from "../../utils/DuoBoxIcon";
import DotIconForLightArrestor from "../../utils/DotIconForLightArrestor";
import DotIconForSwitch from "../../utils/DotIconForSwitch";
import SquareIconForFuse from "../../utils/SquareIconForFuse";
import DuoBoxIcon from "../../utils/DuoBoxIcon";

//////////////////////////////-------------------------------TC-------------------------------------------////////////////////
export const Transformerwaypoints = [
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
  { id: "L1A", coordinates: [2, 7.5] },
  { id: "L1B", coordinates: [4, 7.5] },
  { id: "L1C", coordinates: [6, 7.5] },
  { id: "S1A", coordinates: [2, 5.7] },
  { id: "S1B", coordinates: [4, 5.7] },
  { id: "S1C", coordinates: [6, 5.7] },
  { id: "F1A", coordinates: [2, 4.5] },
  { id: "F1B", coordinates: [4, 4.5] },
  { id: "F1C", coordinates: [6, 4.5] },
  { id: "TD", coordinates: [4, 2.4] },
  { id: "DB", coordinates: [8, 2] },
  { id: "TL", coordinates: [-1, 7.5] },
  { id: "TR", coordinates: [9, 7.5] },
];

export const Transformerlines = [
  { id: "A_Overground", from: [0, 0], to: [0, 7.5] },
  { id: "A_Underground", from: [0, 0], to: [0, -3] },
  { id: "B_Overground", from: [8, 0], to: [8, 7.5] },
  { id: "B_Underground", from: [8, 0], to: [8, -3] },
  { id: "Line_LightningArrestorSupport", from: [0, 7.5], to: [8, 7.5] },
  { id: "Line_SwitchSupport", from: [0, 5.7], to: [8, 5.7] },
  { id: "Line_FuseSupport", from: [0, 4.5], to: [8, 4.5] },
  { id: "Line_TransformerSupport", from: [0, 2.4], to: [8, 2.4] },
  { id: "Base_Ground_Line", from: [-3, 0], to: [11, 0] },
  { id: "LOADCONNECTORTC", from: [4, 2.8], to: [4, 3] },
  { id: "LOADXLINE", from: [4, 3], to: [7, 3] },
  { id: "LOADYLINE", from: [7, 3], to: [7, -1] },
  { id: "LDG1", from: [6.9, -0.8], to: [7.1, -0.8] },
  { id: "LDG2", from: [6.8, -0.7], to: [7.2, -0.7] },
  { id: "LDG3", from: [6.7, -0.6], to: [7.3, -0.6] },
];

export const TransformervisiblePointIds = [
  "A_Underground",
  "B_Underground",
  "TD",
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

export const Transformerscale = 50;

export const TransformercustomIcons = {
  L1A: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),

  L1B: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),
  L1C: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),
  S1A: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),
  S1B: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),
  S1C: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),
  F1A: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SquareIconForFuse width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

  F1B: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SquareIconForFuse width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

  F1C: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SquareIconForFuse width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

  TD: (x, y, onClick) => (
    <g
      transform={`translate(${x - 45}, ${y - 80})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <rect x={-5} y={-5} width={30} height={30} fill="transparent" />
      <OTCIcon width={20} height={20} />
    </g>
  ),

  DB: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 20})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DuoBoxIcon fill={fill} stroke={stroke} />
    </g>
  ),
};

//////////////////////////////-------------------------------Switch-------------------------------------------////////////////////

export const switchWaypoints = [
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
  { id: "L1A", coordinates: [2, 7.5] },
  { id: "L1B", coordinates: [4, 7.5] },
  { id: "L1C", coordinates: [6, 7.5] },
  { id: "S1A", coordinates: [2, 5.7] },
  { id: "S1B", coordinates: [4, 5.7] },
  { id: "S1C", coordinates: [6, 5.7] },
  { id: "F1A", coordinates: [2, 4.5] },
  { id: "F1B", coordinates: [4, 4.5] },
  { id: "F1C", coordinates: [6, 4.5] },
  { id: "TL", coordinates: [-1, 7.5] },
  { id: "TR", coordinates: [9, 7.5] },
];

export const switchLines = [
  { id: "A_Overground", from: [0, 0], to: [0, 7.5] },
  { id: "A_Underground", from: [0, 0], to: [0, -3] },
  { id: "B_Overground", from: [8, 0], to: [8, 7.5] },
  { id: "B_Underground", from: [8, 0], to: [8, -3] },
  { id: "Line_LightningArrestorSupport", from: [0, 7.5], to: [8, 7.5] },
  { id: "Line_SwitchSupport", from: [0, 5.7], to: [8, 5.7] },
  { id: "Base_Ground_Line", from: [-3, 0], to: [11, 0] },
];
export const SwitchScale = 50;

export const switchVisiblePointIds = [
  "A_Underground",
  "B_Underground",
  "S1A",
  "S1B",
  "S1C",
  "L1A",
  "L1B",
  "L1C",
  "TR",
  "TL",
];

export const switchCustomIcons = {
  L1A: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),

  L1B: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),
  L1C: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),
  S1A: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),
  S1B: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),
  S1C: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),
  



  
};

//////////////////////////////-------------------------------Fuse-------------------------------------------////////////////////

export const FuseWaypoints = [
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
  { id: "L1A", coordinates: [2, 7.5] },
  { id: "L1B", coordinates: [4, 7.5] },
  { id: "L1C", coordinates: [6, 7.5] },

  { id: "F1A", coordinates: [2, 4.5] },
  { id: "F1B", coordinates: [4, 4.5] },
  { id: "F1C", coordinates: [6, 4.5] },

  { id: "TL", coordinates: [-1, 7.5] },
  { id: "TR", coordinates: [9, 7.5] },
];

export const FuseLines = [
  { id: "A_Overground", from: [0, 0], to: [0, 7.5] },
  { id: "A_Underground", from: [0, 0], to: [0, -3] },
  { id: "B_Overground", from: [8, 0], to: [8, 7.5] },
  { id: "B_Underground", from: [8, 0], to: [8, -3] },
  { id: "Line_LightningArrestorSupport", from: [0, 7.5], to: [8, 7.5] },
  { id: "Base_Ground_Line", from: [-3, 0], to: [11, 0] },
  { id: "Line_FuseSupport", from: [0, 4.5], to: [8, 4.5] },
];
export const FuseScale = 50;

export const FuseVisiblePointIds = [
  "A_Underground",
  "B_Underground",
  "L1A",
  "L1B",
  "L1C",
  "TR",
  "TL",
  "F1A",
  "F1B",
  "F1C",
];

export const FuseCustomIcons = {
  L1A: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),

  L1B: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),
  L1C: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForLightArrestor
        width={20}
        height={20}
        fill={fill}
        stroke={stroke}
      />
    </g>
  ),
  S1A: (x, y, onClick, fill = "#6cae4a", stroke = "#4f6b3d") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <DotIconForSwitch width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

  F1A: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SquareIconForFuse width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

  F1B: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SquareIconForFuse width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

  F1C: (x, y, onClick, fill = "#4472c4", stroke = "#2f528f") => (
    <g
      transform={`translate(${x - 10}, ${y - 10})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <SquareIconForFuse width={20} height={20} fill={fill} stroke={stroke} />
    </g>
  ),

};
