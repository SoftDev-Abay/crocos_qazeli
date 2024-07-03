import React from "react";
import { IconProps } from "../constants/IconTypes";
const HouseIcon = ({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66675 18.333H18.3334"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.45825 18.3336L2.49992 8.30863C2.49992 7.8003 2.74159 7.31697 3.14159 7.0003L8.97492 2.45863C9.26837 2.23159 9.62889 2.1084 9.99992 2.1084C10.3709 2.1084 10.7315 2.23159 11.0249 2.45863L16.8583 6.99197C17.2666 7.30863 17.4999 7.79197 17.4999 8.30863V18.3336"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M10.8334 14.167H9.16675C8.47508 14.167 7.91675 14.7253 7.91675 15.417V18.3337H12.0834V15.417C12.0834 14.7253 11.5251 14.167 10.8334 14.167ZM7.91675 11.4587H6.25008C5.79175 11.4587 5.41675 11.0837 5.41675 10.6253V9.37533C5.41675 8.91699 5.79175 8.54199 6.25008 8.54199H7.91675C8.37508 8.54199 8.75008 8.91699 8.75008 9.37533V10.6253C8.75008 11.0837 8.37508 11.4587 7.91675 11.4587ZM13.7501 11.4587H12.0834C11.6251 11.4587 11.2501 11.0837 11.2501 10.6253V9.37533C11.2501 8.91699 11.6251 8.54199 12.0834 8.54199H13.7501C14.2084 8.54199 14.5834 8.91699 14.5834 9.37533V10.6253C14.5834 11.0837 14.2084 11.4587 13.7501 11.4587Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M15.8333 5.83301L15.8083 3.33301H12.1416"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HouseIcon;
