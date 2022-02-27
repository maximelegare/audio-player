import React from "react";
import styles from "../../styles/Card/BigCard.module.scss";

import Link from "next/link";

const BigCard = ({ title, route }) => {
  return (
    <Link href={route} passHref>
      <div className={styles.container}>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default BigCard;
