import * as React from "react";
import styles from "./Textfield.module.scss";

interface TextfieldProps {
  id: string;
  name: string;
  type: string;
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

  let autoCorrectValue = autoCorrect ? "on" : "off";
  let autoCapitalizeValue = autoCapitalize ? "on" : "off";
  let fieldStyle = style ? styles[style] : "";
  let sizeStyle = size == "large" ? styles.large : styles.small;

  return (
    <input
      className={`${styles.input} ${fieldStyle} ${sizeStyle}`}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      spellCheck={spellCheck}
      autoCorrect={autoCorrectValue}
      autoCapitalize={autoCapitalizeValue}
    />
  );
};

export default Textfield;
