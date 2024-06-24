import React from "react";
import "./style.scss";

interface InputGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  children,
  className,
  style,
  labelClassName,
  labelStyle,
}) => {
  return (
    <div className={`input-group ${className ? className : ""}`} style={style}>
      <label
        className={`input-group-label ${labelClassName}`}
        style={labelStyle}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputGroup;
