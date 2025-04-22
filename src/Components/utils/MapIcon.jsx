import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const transformerIcon = new L.Icon({
iconUrl: "/map_icons/Transformer.svg",
  iconSize: [23,23],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const ctptIcon = new L.Icon({
  iconUrl: "/map_icons/CTPT.svg",
  iconSize: [23, 23],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const switchIcon = new L.Icon({
  iconUrl: "/map_icons/Switch.svg",
  iconSize: [23, 23],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const fuseIcon = new L.Icon({
  iconUrl: "/map_icons/Fuse.svg",
  iconSize: [23, 23],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
