import React from "react";

import { IconProps } from "../constants/IconTypes";

const CloseIcon = ({ className = "", width = 32, height = 32 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="mask0_309_415"
        // style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_309_415)">
        <path
          d="M8.85738 25.6667L7 23.8L14.4295 16.3333L7 8.86667L8.85738 7L16.2869 14.4667L23.7164 7L25.5738 8.86667L18.1443 16.3333L25.5738 23.8L23.7164 25.6667L16.2869 18.2L8.85738 25.6667Z"
          fill="#333333"
          fill-opacity="0.54"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;
