import React from "react";
import ArrowDownIcon from "@/app/icons/ArrowDownIcon";

interface SingleSelectProps {
  options: any[];
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  disabled?: boolean;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  return (
    <div className="select">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleSelect;
