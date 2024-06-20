import React from "react";
import { IconProps } from "../constants/IconTypes";
const ArrowLeftIcon = ({
  className = "",
  width = 32,
  height = 32,
  fill = "#0A2910",
  color = "#26333D",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.77859 4.2002L2.479 8.49978L6.77859 12.7994M14.5207 8.49978H2.59942"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;
