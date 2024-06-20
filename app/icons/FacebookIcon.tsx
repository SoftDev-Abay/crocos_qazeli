import React from "react";
import { IconProps } from "../constants/IconTypes";
const FacebookIcon = ({
  className = "",
  width = 32,
  height = 32,
  fill = "#0A2910",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.33187 2.32459H10.61V0.0985836C10.3895 0.06825 9.63112 0 8.74796 0C6.90521 0 5.64288 1.15909 5.64288 3.28941V5.25H3.60938V7.7385H5.64288V14H8.13604V7.73909H10.0873L10.397 5.25059H8.13546V3.53616C8.13605 2.81691 8.32971 2.32459 9.33187 2.32459Z"
        fill={fill}
        fill-opacity="0.74"
      />
    </svg>
  );
};

export default FacebookIcon;
