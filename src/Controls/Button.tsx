import * as React from "react";
import { ThemeContext } from "..";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { label, primary, type, disabled } = props;

  const { theme } = React.useContext(ThemeContext);

  return (
    <button
      className={`${styles.button} ${primary && styles.primary} ${
        styles[theme]
      }`}
      type={type || "button"}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
