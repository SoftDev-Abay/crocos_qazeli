import styles from "./style.module.scss";

interface ToggleProps {
  children: React.ReactNode;
  state: boolean;
  onClick: () => void;
}

const Toggle = ({ children, state, onClick }: ToggleProps) => {
  return (
    <button
      className={styles.Toggle}
      data-state={state ? "on" : "off"}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Toggle;
