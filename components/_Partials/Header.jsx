import React from "react";
import styles from "../../styles/Header/Header.module.scss";
import CustomImage from "../_Core/CustomImage";

const Header = ({}) => {
  return (
    <div className={styles.container}>
      <CustomImage
        src="https://upload.wikimedia.org/wikipedia/en/8/8e/World_Domination_%28Band-Maid_album%29.png"
        alt=""
        width={180}
        height={160}
      />
      <div className={styles.headerInfos}>
        <h3 className={styles.artist}>BAND MAID</h3>
        <h1 className={styles.title}>WORLD DOMINATION</h1>
      </div>
    </div>
  );
};

export default Header;

