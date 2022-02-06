import React from "react";
import styles from "../../styles/Header/Header.module.scss";
import CustomImage from "../_Core/CustomImage";

const Header = ({}) => {
  return (
    <div className={styles.container}>
      <CustomImage
        src="https://docs.google.com/uc?id=1MdNgZgi72rDCK224yJehRAxe413atw--"
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

