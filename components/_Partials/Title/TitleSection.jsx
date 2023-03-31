import React from "react";
import styles from "../../../styles/Title/titleSection.module.scss";

const TitleSection = ({ title, noBottomMargin, noMarginTop }) => {
  return (
    <>
      {title && (
        <div
          className={`${noBottomMargin ? "" : "mb-7"} ${
            noMarginTop ? "" : "mt-4"
          }  `}
        >
          <h2 className={styles.topTitle}>{title}</h2>
          <hr className="opacity-10" />
        </div>
      )}
    </>
  );
};

export default TitleSection;
