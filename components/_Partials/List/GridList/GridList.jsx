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
            {...otherProps}
          />
        );
    }
  };

  return (
    <PageLayout>
      <div
        className={`${styles.gridListContainer} ${
          variant === "bigCard" && styles.large
        }`}
      >
        {data.map((item) => selectCard(item))}
      </div>
    </PageLayout>
  );
};

export default GridList;
