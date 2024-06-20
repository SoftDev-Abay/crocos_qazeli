import React, { FC, HTMLAttributes } from "react";

import { IconProps } from "../constants/IconTypes";

const MenuIcon = ({ className = "", width = 46, height = 28 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="8" y="8" width="30" height="2" fill="#333333" />
      <rect x="8" y="18" width="30" height="2" fill="#333333" />
    </svg>
  );
};

export default MenuIcon;
