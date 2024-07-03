import React from "react";
import { IconProps } from "../constants/IconTypes";
const CloseCircleIcon = ({
  className = "",
  width = 24,
  height = 24,
  color = "#BE4646",
}: IconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3805_4137)">
        <path
          d="M7.6415 12.3587L12.3582 7.64199M12.3582 12.3587L7.6415 7.64199M9.99984 18.3337C14.5832 18.3337 18.3332 14.5837 18.3332 10.0003C18.3332 5.41699 14.5832 1.66699 9.99984 1.66699C5.4165 1.66699 1.6665 5.41699 1.6665 10.0003C1.6665 14.5837 5.4165 18.3337 9.99984 18.3337Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3805_4137">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CloseCircleIcon;
