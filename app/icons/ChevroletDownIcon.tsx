import React from "react";
import { IconProps } from "../constants/IconTypes";
const ChevroletDownIcon = ({
  className = "",
  width = 24,
  height = 24,
  color = "#26333D",
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.4001 12.542L8.83343 7.10866C9.4751 6.46699 10.5251 6.46699 11.1668 7.10866L16.6001 12.542"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevroletDownIcon;
