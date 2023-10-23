import React, { useState } from "react";
import styles from "./searchField.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

const SearchField = ({
  value,
  setValue,
  resetValue,
  onChange,
  placeholder,
  height = "32px",
  ...props
}) => {
  const [fill, setFill] = useState("9C9C9C");

  return (
    <div className={styles.inputContainer} style={{ height }}>
      <CiLocationOn size="20px" color={fill} />

      <input
        onFocus={() => setFill("var(--sunset-orange)")}
        onBlur={() => setFill("9C9C9C")}
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />

      <AiOutlineCloseCircle
        onClick={resetValue}
        size="20px"
        color={"9C9C9C"}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default React.memo(SearchField);
