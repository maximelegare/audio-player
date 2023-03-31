import React from "react";
import GridListElement from "./GridListElement";
import styles from "../../../../styles/List/GridList.module.scss";

import PageLayout from "../../../Layout/PageLayout";

import GridListBigCardElement from "./GridListBigCardElement";

const GridList = ({ data, variant, ...otherProps }) => {


  const selectCard = (item) => {
    switch (variant) {
      case "bigCard":
        return (
          <GridListBigCardElement
            key={item.title}
            picture_url={item.picture_url}
            title={item.title}
            route={item.route}
            year={item.year}
            artist={item.artist}
            images={item.images}
            {...otherProps}
          />
        );
      default:
        return (
          <GridListElement
            key={item.title}
            picture_url={item.picture_url}
            title={item.title}
            route={item.route}
            round
            {...otherProps}
          />
        );
    }
  };

  return (
      <div
        className={`${styles.gridListContainer} ${
          variant === "bigCard" && styles.large
        }`}
      >
        {data.map((item) => selectCard(item))}
       
      </div>
  );
};

export default GridList;
