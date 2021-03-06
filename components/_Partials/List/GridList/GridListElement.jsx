import React from "react";
import styles from "../../../../styles/List/GridList.module.scss";
import CustomImage from "../../../_Core/CustomImage";

import { useRouter } from "next/router";

const GridListElement = ({ picture_url, title, route, round }) => {
  const router = useRouter();

  

  return (
    <div
      className={styles.gridListElementContainer}
      onClick={() => router.push(`/${route}`)}
    >
      <CustomImage height={80} width={80} src={picture_url} alt="" round={round}/>
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};

export default GridListElement;
