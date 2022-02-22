import React from "react";
import { useState } from "react";

import styles from "../../styles/_Core/CustomInput.module.scss";

const CustomInput = ({ placeHolder, value, handleChange }) => {
  
  return (
    <input
      className={styles.input}
      autoFocus
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
    />
  );
};

export default CustomInput;
