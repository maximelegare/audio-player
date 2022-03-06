import React, { ReactChildren, ReactElement } from "react";

import styles from "../../styles/_Core/CustomButton.module.scss";


interface Props {
  falseButton?: boolean;
  variant: string,
  handleClick:(e) => void
  children?:ReactElement | string
} 


const CustomButton:React.FC <Props> = ({
  falseButton,
  variant,
  handleClick,
  children,
}) => {

  const getStyles = (variant:string) => {
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
          onClick={handleClick}
          className={getStyles(variant)}
        >
          {children}
        </div>
      ) : (
        <button
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
