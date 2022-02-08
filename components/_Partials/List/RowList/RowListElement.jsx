import React from "react";
import styles from "../../../../styles/List/RowList.module.scss";

import CustomImage from "../../../_Core/CustomImage";

import { calculateTime } from "../../../../lib/utilities";

const RowListElement = ({id, title, artist, picture_url, album, duration, songNumber}) => {



  return (
    <div className={styles.rowListContainer}>
      <div className={`${styles.firstThird} ${styles.section}`}>
        <p className={styles.number}>{songNumber}</p>
        <div className={styles.image}>
          <CustomImage
            width={50}
            height={50}
            src={picture_url}
            alt=""
          />
        </div>
        <div className={styles.infosContainer}>
          <h4 className={styles.title}>{title}</h4>
          <p>{artist}</p>
        </div>
      </div>
      <p>{album}</p>
      <p className={styles.time}>{calculateTime(duration)}</p>
    </div>
  );
};

export default RowListElement;
