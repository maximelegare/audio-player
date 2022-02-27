import React from "react";

import styles from "../../styles/_Core/CustomButton.module.scss";

const CustomButton = ({
  falseButton,
  variant,
  handleClick,
  type,
  children,
}) => {
  const getStyles = (variant) => {
    switch (variant) {
      case "play": {
        return styles.playPause;
      }
      case "play-small":{
        return `${styles.playPause} ${styles.small}`
      }
      case "forwardBackward": {
        return styles.forwardBackward;
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
      {falseButton ? (
        <div
          type={type ? type : ""}
          onClick={handleClick}
          className={getStyles(variant)}
        >
          {children}
        </div>
      ) : (
        <button
          type={type ? type : ""}
          onClick={handleClick}
          className={getStyles(variant)}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default CustomButton;
