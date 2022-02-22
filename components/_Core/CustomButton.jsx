import React from "react";

import styles from "../../styles/_Core/CustomButton.module.scss";

const CustomButton = ({ variant, handleClick, type, children }) => {
  const getStyles = (variant) => {
    switch (variant) {
      case "play": {
        return styles.playPause;
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
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      className={getStyles(variant)}
    >
      {children}
    </button>
  );
};

export default CustomButton;
