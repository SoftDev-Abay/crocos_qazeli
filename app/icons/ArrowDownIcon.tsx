import React from "react";
import { IconProps } from "../constants/IconTypes";
const ArrowDownIcon = ({
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
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.12987 4.60193L6.14154 7.59026C5.78862 7.94318 5.21112 7.94318 4.85821 7.59026L1.86987 4.60193"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
