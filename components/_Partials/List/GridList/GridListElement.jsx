import React from "react";
import styles from "../../../../styles/List/GridList.module.scss";
import CustomImage from "../../../_Core/CustomImage";

const GridListElement = ({ src, title }) => {
  return (
    <div className={styles.gridListElementContainer}>
      <CustomImage height={50} width={50} src={src} alt="" />
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};

export default GridListElement;
