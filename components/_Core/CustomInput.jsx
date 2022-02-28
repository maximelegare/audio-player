import React from "react";
import { useState } from "react";

import styles from "../../styles/_Core/CustomInput.module.scss";

const CustomInput = ({ placeHolder, value, handleChange, variant }) => {
  
  const getStyles = (variant) => {

    switch (variant) {
      case "bigInput":{
        return styles.bigInput
      }
      default :{
        return styles.input
      }
    }


  }




  return (
    <input
      className={getStyles(variant)}
      autoFocus
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
    />
  );
};

export default CustomInput;
