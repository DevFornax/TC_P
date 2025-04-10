const SquareIconForFuse = ({
  width = 24,
  height = 35,
  fill = "#4472c4",
  stroke = "#2f528f",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 35"
  >
    <g
      transform="translate(24) rotate(90)"
      fill={fill}
      stroke={stroke}
      strokeWidth="1"
    >
      <rect width="35" height="24" stroke="none" />
      <rect x="0.5" y="0.5" width="34" height="23" fill="none" />
    </g>
  </svg>
);

export default SquareIconForFuse;
