const DotIconForSwitch = ({
  width = 24,
  height = 35,
  fill = "#6cae4a",
  stroke = "#4f6b3d",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 76 76"
  >
    <g fill={fill} stroke={stroke} strokeWidth="2">
      <circle cx="38" cy="38" r="38" stroke="none" />
      <circle cx="38" cy="38" r="37" fill="none" />
    </g>
  </svg>
);

export default DotIconForSwitch;
