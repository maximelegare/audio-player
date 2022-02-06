import React from "react";
import styles from "../../../../styles/List/GridList.module.scss";
import CustomImage from "../../../_Core/CustomImage";

const GridListElement = ({src, title}) => {
  return (
    <div className={styles.gridListElementContainer}>
      <div className={styles.content}>
        <CustomImage
          height={60}
          width={60}
          src={src}
          alt=""
        />
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default GridListElement;
