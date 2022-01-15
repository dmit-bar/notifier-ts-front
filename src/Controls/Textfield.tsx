import * as React from "react";
import "./Textfield.scss";

interface TextfieldProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
}

const Textfield = (props: TextfieldProps) => {
  const { name, id, type, placeholder } = { ...props };

  return (
    <input
      className="input margin-v"
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
    />
  );
};

export default Textfield;
