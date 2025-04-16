const DotIconForLightArrestor = ({
  width = 24,
  height = 24,
  fill = "blue",
  stroke = "#4f6b3d",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 76 76"
  >
    <g fill={fill} stroke={stroke} strokeWidth="2">
      <circle cx="38" cy="38" r="26" stroke="none" />
      <circle cx="38" cy="38" r="25" fill="none" />
    </g>
  </svg>
);

export default DotIconForLightArrestor;
