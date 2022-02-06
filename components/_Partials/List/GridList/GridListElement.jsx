import React from "react";
import styles from "../../../../styles/List/GridList.module.scss";
import CustomImage from "../../../_Core/CustomImage";

const GridListElement = () => {
  return (
    <div className={styles.gridListElementContainer}>
      <div className={styles.content}>
        <CustomImage
          height={60}
          width={60}
          src="https://docs.google.com/uc?id=1MdNgZgi72rDCK224yJehRAxe413atw--"
          alt=""
        />
        <h3>Trident</h3>
      </div>

    </div>
  );
};

export default GridListElement;
