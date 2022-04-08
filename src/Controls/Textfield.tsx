import { useField } from "formik";
import * as React from "react";
import { ThemeContext } from "..";
import styles from "./Textfield.module.scss";

interface TextfieldProps {
  id: string;
  name: string;
  type: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  label?: string;
  size?: string;
  style?: string;
  placeholder?: string;
  spellCheck?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: boolean;
  autoComplete?: boolean;
}

const Textfield = (props: TextfieldProps) => {
  const {
    name,
    id,
    type,
    disabled,
    isSubmitting,
    placeholder,
    spellCheck,
    size,
    style,
    autoCapitalize,
    autoCorrect,
    autoComplete,
  } = { ...props };

  const [field, meta] = useField(name);

  const { theme } = React.useContext(ThemeContext);

  let autoCorrectValue = autoCorrect ? "on" : "off";
  let autoCapitalizeValue = autoCapitalize ? "on" : "off";
  let autoCompleteValue = autoComplete ? "on" : "off";
  let fieldStyle = style ? styles[style] : "";
  let sizeStyle = size == "large" ? styles.large : styles.small;
  let hasError = meta.touched && meta.error;

  return (
    <div className={styles.field}>
      <input
        className={`${styles.input} ${fieldStyle} ${sizeStyle} ${
          hasError && styles.error
        } ${styles[theme]}`}
        {...field}
        type={type}
        name={name}
        id={id}
        disabled={disabled || isSubmitting}
        placeholder={placeholder}
        spellCheck={spellCheck}
        autoCorrect={autoCorrectValue}
        autoCapitalize={autoCapitalizeValue}
        autoComplete={autoCompleteValue}
      />
      <span className={`${styles.errorLabel} ${styles[theme]}`}>
        {hasError ? meta.error : " "}
      </span>
    </div>
  );
};

export default Textfield;
