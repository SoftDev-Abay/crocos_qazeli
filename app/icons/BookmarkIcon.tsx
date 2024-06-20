import React from "react";
import { IconProps } from "../constants/IconTypes";
const BookmarkIcon = ({
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
      <g clip-path="url(#clip0_3805_3793)">
        <path
          d="M7.50008 18.3337H12.5001C16.6667 18.3337 18.3334 16.667 18.3334 12.5003V7.50033C18.3334 3.33366 16.6667 1.66699 12.5001 1.66699H7.50008C3.33341 1.66699 1.66675 3.33366 1.66675 7.50033V12.5003C1.66675 16.667 3.33341 18.3337 7.50008 18.3337Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.1666 2.0332V10.3499C14.1666 11.9915 12.9916 12.6332 11.5499 11.7665L10.4499 11.1082C10.1999 10.9582 9.79992 10.9582 9.54992 11.1082L8.44992 11.7665C7.00825 12.6249 5.83325 11.9915 5.83325 10.3499V2.0332"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.50008 18.3337H12.5001C16.6667 18.3337 18.3334 16.667 18.3334 12.5003V7.50033C18.3334 3.33366 16.6667 1.66699 12.5001 1.66699H7.50008C3.33341 1.66699 1.66675 3.33366 1.66675 7.50033V12.5003C1.66675 16.667 3.33341 18.3337 7.50008 18.3337Z"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.1666 2.0332V10.3499C14.1666 11.9915 12.9916 12.6332 11.5499 11.7665L10.4499 11.1082C10.1999 10.9582 9.79992 10.9582 9.54992 11.1082L8.44992 11.7665C7.00825 12.6249 5.83325 11.9915 5.83325 10.3499V2.0332"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3805_3793">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BookmarkIcon;
