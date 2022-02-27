import React from "react";

import styles from "../../../../styles/List/GridListBigCard.module.scss";
import CustomImage from "../../../_Core/CustomImage";

import { useRouter } from "next/router";

import FourImagesSquare from "../../../_Core/FourImagesSquare";

const GridListBigCardElement = ({
  picture_url,
  title,
  route,
  year,
  round,
  artist,
  images,
}) => {
  const router = useRouter();


  console.log(images)

  return (
    <div className={styles.container} onClick={() => router.push(`/${route}`)}>

      {images?.length === 4 ? (
        <FourImagesSquare images={images} width={75} height={75} />
      ) : (
        <CustomImage
          round={round}
          src={(images && images[0]?.picture_url) || picture_url}
          alt=""
          width={150}
          height={150}
        />
      )}
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
