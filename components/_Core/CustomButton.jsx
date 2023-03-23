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
  underline,
}) => {
  const getStyles = (variant) => {
    console.log(underline)
    switch (variant) {
      case "play": {
        return `bg-gradiantPrimary bg-white ${styles.playPause}`;
      }
      case "play-small": {
        return `bg-gradiantPrimary bg-white ${styles.playPause} ${styles.small}`;
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
      <div className="relative">
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
                className={`${disabled && styles.disabled} ${getStyles(
                  variant
                )}`}
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
                className={`${disabled && styles.disabled} ${getStyles(
                  variant
                )}`}
                disabled={disabled}
              >
                {children}
              </button>
            )}
          </>
        )}
        <div className={underline ? "visible" : "hidden"}>
          <div className="absolute -bottom-2 rounded-full h-1 w-full bg-gradiantPrimary"></div>
        </div>
      </div>
    </>
  );
};

export default CustomButton;
