import { useField } from "formik";
import * as React from "react";
import styles from "./Textfield.module.scss";

interface TextfieldProps {
  id: string;
  name: string;
  type: string;
  label?: string;
  size?: string;
  style?: string;
  placeholder?: string;
  spellCheck?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: boolean;
}

const Textfield = (props: TextfieldProps) => {
  const {
    name,
    id,
    type,
    placeholder,
    spellCheck,
    size,
    style,
    autoCapitalize,
    autoCorrect,
  } = { ...props };

  const [field, meta] = useField(name);

  let autoCorrectValue = autoCorrect ? "on" : "off";
  let autoCapitalizeValue = autoCapitalize ? "on" : "off";
  let fieldStyle = style ? styles[style] : "";
  let sizeStyle = size == "large" ? styles.large : styles.small;
  let hasError = meta.touched && meta.error;

  return (
    <div className={styles.field}>
      <input
        className={`${styles.input} ${fieldStyle} ${sizeStyle} ${
          hasError && styles.error
        }`}
        {...field}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        spellCheck={spellCheck}
        autoCorrect={autoCorrectValue}
        autoCapitalize={autoCapitalizeValue}
      />
      <span className={styles.errorLabel}>{hasError ? meta.error : " "}</span>
    </div>
  );
};

export default Textfield;
