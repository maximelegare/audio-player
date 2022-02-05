import React from "react";
import styles from "../../styles/Center/CenterHeader.module.scss";
import Image from "next/image";

const CenterHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/en/8/8e/World_Domination_%28Band-Maid_album%29.png"
          alt=""
          width={180}
          height={160}
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.headerInfos}>
          <h3 className={styles.artist}>Band Maid</h3>   
          <h1 className={styles.title}>Title of the Song</h1>
      </div>
    </div>
  );
};

export default CenterHeader;
