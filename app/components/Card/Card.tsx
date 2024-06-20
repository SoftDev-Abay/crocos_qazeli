import React from "react";
import "./style.scss";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "padding-small" | "padding-medium" | "padding-large";
}

const Card: React.FC<CardProps> = ({ padding = "padding-medium", ...rest }) => {
  return (
    <div className={`card ${padding}`} {...rest}>
      {rest.children}
    </div>
  );
};

export default Card;
