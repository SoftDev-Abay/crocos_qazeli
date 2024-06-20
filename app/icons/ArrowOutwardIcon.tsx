import React from "react";
import { IconProps } from "../constants/IconTypes";

const ArrowOutwardIcon = ({
  className = "",
  width = 32,
  height = 32,
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_117_480"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_117_480)">
        <path
          d="M6.40078 18.2006L4.80078 16.6006L14.2758 7.15059H5.85078V4.85059H18.1508V17.1506H15.8508V8.72559L6.40078 18.2006Z"
          fill="#6EB63C"
        />
      </g>
    </svg>
  );
};

export default ArrowOutwardIcon;
