import React from "react";
import GridListElement from "./GridListElement";
import styles from "../../../../styles/List/GridList.module.scss";

const GridList = ({ data }) => {
  return (
    <div className={styles.gridListContainer}>
      {data.map((item) => (
        <GridListElement
          key={item.id}
          src={item.picture_url}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default GridList;
