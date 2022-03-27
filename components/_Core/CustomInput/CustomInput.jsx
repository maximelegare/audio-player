import React, { useState } from "react";

import styles from "../../../styles/_Core/CustomInput.module.scss";
import CustomInputDropdown from "./CustomInputDropdown";

const CustomInput = ({
  placeHolder,
  handleChange,
  variant,
  isLoading,
  dropdownSectionsData,
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
      handleChange(e);
      setInputValue(e.target.value);
    }
  };

  return (
    <>
      <input
        className={getStyles(variant)}
        autoFocus
        type="text"
        value={inputValue}
        onChange={handleChangeLocally}
        placeholder={placeHolder}
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
