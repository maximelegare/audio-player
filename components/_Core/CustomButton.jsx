import React from "react";

import styles from "../../styles/_Core/CustomButton.module.scss";
import { PopoverClose } from "@radix-ui/react-popover";
const CustomButton = ({
  popOverClose,
  variant,
  handleClick,
  type,
  children,
  disabled
}) => {
  const getStyles = (variant) => {
    switch (variant) {
      case "play": {
        return styles.playPause;
      }
      case "play-small":{
        return `${styles.playPause} ${styles.small}`
      }
      case "iconOnly": {
        return styles.iconOnly;
      }
      case "volume": {
        return styles.volume;
      }
      case "text": {
        return styles.text;
      }
    }
  };

  return (
    <>
      {popOverClose ? (
        <PopoverClose
          type={type ? type : ""}
          onClick={handleClick}
          className={`${disabled && styles.disabled} ${getStyles(variant)}`}
          disabled={disabled}
        >
          {children}
        </PopoverClose>
      ) : (
        <button
          type={type ? type : ""}
          onClick={handleClick}
          className={`${disabled && styles.disabled} ${getStyles(variant)}`}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default CustomButton;
