import * as React from "react";
import { ThemeContext } from "../Components/Theme/Theme";
import styles from "./Button.module.scss";

interface ButtonProps {
  label: string;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isSubmitting?: boolean;
}

const Button = (props: ButtonProps) => {
  const { label, primary, type, disabled, isSubmitting } = props;

  const { theme } = React.useContext(ThemeContext);

  return (
    <button
      className={`${styles.button} ${primary && styles.primary} ${
        styles[theme]
      } ${isSubmitting && styles.submitting}`}
      type={type || "button"}
      disabled={disabled || isSubmitting}
    >
      {label}
    </button>
  );
};

export default Button;
