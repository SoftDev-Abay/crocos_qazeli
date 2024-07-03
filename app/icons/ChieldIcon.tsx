import React from "react";
import { IconProps } from "../constants/IconTypes";
const ChieldIcon = ({
  className = "",
  width = 24,
  height = 24,
  color = "#26333D",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1666 5.17713V6.60454C14.1666 8.90599 13.083 11.0731 11.2419 12.454C9.617 13.6726 7.38283 13.6726 5.75798 12.454C3.91682 11.0731 2.83325 8.90599 2.83325 6.60454V5.17712C2.83325 4.07255 3.72868 3.17712 4.83325 3.17712H12.1666C13.2712 3.17712 14.1666 4.07256 14.1666 5.17713Z"
        stroke={color}
        strokeWidth={"2"}
        strokeLinecap="round"
      />
      <circle cx="8.50008" cy="7.42708" r="0.708333" fill={color} />
      <circle cx="6.37508" cy="7.42708" r="0.708333" fill={color} />
      <circle cx="10.6251" cy="7.42708" r="0.708333" fill={color} />
    </svg>
  );
};

export default ChieldIcon;
