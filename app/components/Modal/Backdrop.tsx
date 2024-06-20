import React from "react";
import styles from "./styles.module.scss";

import classNames from "classnames";

interface BackdropProps {
  onClick: Function;
  transparent: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, transparent }) => {
  return (
    <div
      className={classNames(styles.backdrop, {
        [styles.transparent]: transparent,
      })}
      onClick={() => onClick()}
    ></div>
  );
};

export default Backdrop;
