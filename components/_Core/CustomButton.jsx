import React from "react";
import styles from "../../styles/_Core/CustomButton.module.scss";
import { PopoverClose } from "@radix-ui/react-popover";
import Link from "next/link";
const CustomButton = ({
  popOverClose,
  variant,
  handleClick,
  type,
  children,
  disabled,
  href,
}) => {
  const getStyles = (variant) => {
    switch (variant) {
      case "play": {
        return styles.playPause;
      }
      case "play-small": {
        return `${styles.playPause} ${styles.small}`;
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
        <>
          {href ? (
            <Link
              href={href}
              className={`${disabled && styles.disabled} ${getStyles(variant)}`}
              disabled={disabled}
              passHref
            >
              <div
                className={`${disabled && styles.disabled} ${getStyles(
                  variant
                )}`}
                disabled={disabled}
              >
                {children}
              </div>
            </Link>
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
      )}
    </>
  );
};

export default CustomButton;
