import React from "react";
import styles from "./styles.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
