import React from "react";

import styles from "../../../../styles/List/GridListBigCard.module.scss";
import CustomImage from "../../../_Core/CustomImage";

import { useRouter } from "next/router";

const GridListBigCardElement = ({ src, title, route, year, round, artist }) => {
  const router = useRouter();

  return (
    <div className={styles.container} onClick={() => router.push(`/${route}`)}>
      <CustomImage width={150} height={150} src={src} alt="" round={round} />
      <div className={styles.infos}>
        <h5>{title.length < 11 ? title : `${title.slice(0, 11)}...`}</h5>
        <p>
          {year} • {artist}
        </p>
      </div>
    </div>
  );
};

export default GridListBigCardElement;
