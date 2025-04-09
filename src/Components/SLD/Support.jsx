
 import TCIcon from "./TCIcon";
 import DotIcon from "./DotIcon";
 import OTCIcon from "./OTCIcon";
 import SPIcon from "./SPIcon";



 
 
 
 export const waypoints = [
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
   { id: "LA1", coordinates: [2, 7.5] },
   { id: "LA2", coordinates: [4, 7.5] },
   { id: "LA3", coordinates: [6, 7.5] },
   { id: "SW1", coordinates: [2, 5.7] },
   { id: "SW2", coordinates: [4, 5.7] },
   { id: "SW3", coordinates: [6, 5.7] },
   { id: "FS1", coordinates: [2, 4.5] },
   { id: "FS2", coordinates: [4, 4.5] },
   { id: "FS3", coordinates: [6, 4.5] },
   { id: "TBC", coordinates: [4, 2.4] },
   { id: "SP", coordinates: [8, 2] },
   { id: "T-A", coordinates: [-1,7.5] },
   { id: "T-B", coordinates: [9, 7.5] },
 ];

export const lines = [
  { id: "A_Overground", from: [0, 0], to: [0, 7.5] },
  { id: "A_Underground", from: [0, 0], to: [0, -3] },
  { id: "B_Overground", from: [8, 0], to: [8, 7.5] },
  { id: "B_Underground", from: [8, 0], to: [8, -3] },
  { id: "Line_LightningArrestorSupport", from: [0, 7.5], to: [8, 7.5] },
  { id: "Line_SwitchSupport", from: [0, 5.7], to: [8, 5.7] },
  { id: "Line_FuseSupport", from: [0, 4.5], to: [8, 4.5] },
  { id: "Line_TransformerSupport", from: [0, 2.4], to: [8, 2.4] },
  { id: "Base_Ground_Line", from: [-3, 0], to: [11, 0] },
  { id: "Load_stub", from: [4, 2.8], to: [4, 3] },
  { id: "Load_Xline", from: [4, 3], to: [10, 3] },
  { id: "Load_down", from: [10, 3], to: [10, -1] },
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

 export const visiblePointIds = [
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
  "T-A",
  "T-B",
  
];

 export const scale = 50;

export const customIcons = {
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
