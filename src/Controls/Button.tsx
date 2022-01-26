import * as React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { label, disabled } = props;

  return (
    <button disabled={disabled} className={styles.button}>
      {label}
    </button>
  );
};

export default Button;
