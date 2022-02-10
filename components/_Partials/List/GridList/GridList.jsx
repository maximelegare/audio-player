import React from "react";
import GridListElement from "./GridListElement";
import styles from "../../../../styles/List/GridList.module.scss";

import GridListBigCardElement from "./GridListBigCardElement";

const GridList = ({ data, variant }) => {

  const selectCard = (item) => {
    switch (variant) {
      case "bigCard":
        return (
          <GridListBigCardElement
            key={item.title}
          />
        );
      default:
        return (
          <GridListElement
            key={item.title}
            src={item.picture_url}
            title={item.title}
            route={item.route}
          />
        );
    }
  };

  return (
    <div>
      <div className={styles.gridListContainer}>
        {data.map((item) => selectCard(item))}
      </div>
    </div>
  );
};

export default GridList;
