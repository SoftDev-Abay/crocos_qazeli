import React from "react";
import { IconProps } from "../constants/IconTypes";
const ChevroletUpIcon = ({
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
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1101 6.33984L9.4918 10.9582C8.94639 11.5036 8.05389 11.5036 7.50847 10.9582L2.89014 6.33984"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevroletUpIcon;
