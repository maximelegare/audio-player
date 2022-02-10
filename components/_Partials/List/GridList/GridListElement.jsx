import React from "react";
import styles from "../../../../styles/List/GridList.module.scss";
import CustomImage from "../../../_Core/CustomImage";

import { useRouter } from "next/router";
import { createUrlRouteWithTitle } from "../../../../lib/utilities";

const GridListElement = ({ src, title, route }) => {
  const router = useRouter();

  return (
    <div
      className={styles.gridListElementContainer}
      onClick={() => router.push(`/${route}`)}
    >
      <CustomImage height={80} width={80} src={src} alt="" />
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};

export default GridListElement;
