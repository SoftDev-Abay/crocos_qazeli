import React from "react";
import { IconProps } from "../constants/IconTypes";
const LogoutCurveIcon = ({
  className = "",
  width = 24,
  height = 24,
  fill = "#0A2910",
  color = "#0A2910",
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
        d="M6.30409 5.35492C6.52367 2.80492 7.83409 1.76367 10.7028 1.76367H10.7949C13.9612 1.76367 15.2291 3.03159 15.2291 6.19784V10.8162C15.2291 13.9824 13.9612 15.2503 10.7949 15.2503H10.7028C7.85534 15.2503 6.54492 14.2233 6.31117 11.7158M10.6249 8.49992H2.56409M4.14367 6.127L1.77075 8.49992L4.14367 10.8728"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LogoutCurveIcon;
