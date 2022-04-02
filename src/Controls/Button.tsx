import * as React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { label, type, disabled } = props;

  return (
    <button className={styles.button} type={type} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
