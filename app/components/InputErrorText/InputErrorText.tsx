import React from "react";
import styles from "./styles.module.scss";

interface Props extends React.HTMLProps<HTMLDivElement> {
  error: string;
}

const InputErrorText = ({ error, ...rest }: Props) => {
  return (
    <div className={styles.Error} {...rest}>
      {error}
    </div>
  );
};

export default InputErrorText;
