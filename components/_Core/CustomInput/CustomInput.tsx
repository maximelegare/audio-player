import React, { useState } from "react";

import styles from "../../../styles/_Core/CustomInput.module.scss";
import CustomInputDropdown from "./CustomInputDropdown";

interface Props {
  placeHolder: string;
  handleChange: (e: React.ChangeEventHandler<HTMLInputElement>) => void;
  variant?: string;
  isLoading?: boolean;
  dropdownSectionData?: any;
}

const CustomInput: React.FC<Props> = ({
  placeHolder,
  handleChange,
  variant,
  isLoading,
  dropdownSectionsData,
  
}) => {
  const [inputValue, setInputValue] = useState("");

  const getStyles = (variant: string): string => {
    switch (variant) {
      case "bigInput": {
        return styles.bigInput;
      }
      default: {
        return styles.input;
      }
    }
  };

  const handleChangeLocally = (event): void => {
    if (!isLoading) {
      handleChange(event);
      setInputValue(event.target.value);
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

      {(inputValue !== "" || !dropdownSectionsData) && (
        <CustomInputDropdown dropdownSectionsData={dropdownSectionsData} />
      )}
    </>
  );
};

export default CustomInput;
