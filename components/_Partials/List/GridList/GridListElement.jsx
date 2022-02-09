import React from "react";
import styles from "../../../../styles/List/GridList.module.scss";
import CustomImage from "../../../_Core/CustomImage";

import { useRouter } from "next/router";
import { createUrlRouteWithTitle } from "../../../../lib/utilities";


const GridListElement = ({ src, title }) => {

  const router = useRouter()
  const route = createUrlRouteWithTitle(title)


  return (
    <div className={styles.gridListElementContainer} 
    onClick={() => router.push(`/${route}`)}
    >
      <CustomImage height={50} width={50} src={src} alt="" />
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};

export default GridListElement;
