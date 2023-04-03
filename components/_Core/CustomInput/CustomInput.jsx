import React, { useState } from "react";

import styles from "../../../styles/_Core/CustomInput.module.scss";
import CustomInputDropdown from "./CustomInputDropdown";

const CustomInput = ({
  placeHolder,
  handleChange,
  variant,
  isLoading,
  dropdownSectionsData,
  name,
  autoFocus,
  type,
}) => {
  const [inputValue, setInputValue] = useState("");

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
      handleChange({ name: e.target.name, value: e.target.value });
      setInputValue(e.target.value);
    }
  };

  return (
    <>
      <input
        className={getStyles(variant)}
        autoFocus={autoFocus}
        type={type ? type : "text"}
        value={inputValue}
        onChange={handleChangeLocally}
        placeholder={placeHolder}
        name={name}
      />

      {inputValue !== "" && dropdownSectionsData && (
        <CustomInputDropdown
          dropdownSectionsData={dropdownSectionsData}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default CustomInput;
