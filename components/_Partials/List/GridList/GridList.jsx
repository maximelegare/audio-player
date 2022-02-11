import React from "react";
import GridListElement from "./GridListElement";
import styles from "../../../../styles/List/GridList.module.scss";

import GridListBigCardElement from "./GridListBigCardElement";

const GridList = ({ data, variant, ...otherProps }) => {
  
  const selectCard = (item) => {
    switch (variant) {
      case "bigCard":
        return (
          <GridListBigCardElement
            key={item.title}
            src={item.picture_url}
            title={item.title}
            route={item.route}
            year={item.year}
            {...otherProps}
          />
        );
      default:
        return (
          <GridListElement
            key={item.title}
            src={item.picture_url}
            title={item.title}
            route={item.route}
            {...otherProps}
          />
        );
    }
  };

  return (
    <div>
      <div
        className={`${styles.gridListContainer} ${
          variant === "bigCard" && styles.large
        }`}
      >
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
        {data.map((item) => selectCard(item))}
      </div>
    </div>
  );
};

export default GridList;
