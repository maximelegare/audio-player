import React from "react";

import styles from "../../../styles/_Core/CustomInput.module.scss";
import CustomInputDropdown from "./CustomInputDropdown";

const CustomInput = ({
  placeHolder,
  value,
  handleChange,
  variant,
  isLoading,
  list,
}) => {
  const getStyles = (variant) => {
    switch (variant) {
      case "bigInput": {
        return styles.bigInput;
      }
      default: {
        return styles.input;
      }
    }
  };

  const handleChangeLocally = (e) => {
    if (!isLoading) {
      handleChange(e);
    }
  };

  return (
    <>
      <input
        className={getStyles(variant)}
        autoFocus
        type="text"
        value={value}
        onChange={handleChangeLocally}
        placeholder={placeHolder}
      />

      {list && <CustomInputDropdown list={list} />}
    </>
  );
};

export default CustomInput;
