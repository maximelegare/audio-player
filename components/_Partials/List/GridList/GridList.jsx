import React from "react";
import GridListElement from "./GridListElement";
import styles from "../../../../styles/List/GridList.module.scss";

const GridList = ({ data, itemTitle }) => {
  return (
    <div className={styles.gridListContainer}>
      {data.map((item) => (
        <GridListElement
          key={item.id}
          src={item.picture_url}
          title={item[itemTitle]}
        />
      ))}
    </div>
  );
};

export default GridList;
