import React from "react";
import "./style.scss";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "highlight" | "muted" | "success" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  onClick,
  children,
  className,
  size = "md", // Set default size to 'md'
  color = "primary", // Set default color to 'primary'
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn size-${size} color-${color} ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
