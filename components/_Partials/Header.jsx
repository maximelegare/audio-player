import React from "react";
import styles from "../../styles/Header/Header.module.scss";
import CustomImage from "../_Core/CustomImage";

const Header = ({ src }) => {
  return (
    <div className={styles.container}>
      {/* {src && ( */}
        <CustomImage
          src="https://docs.google.com/uc?id=1NRCIz_EIMagmy4l9Io_pZnE2513EVEaG"
          alt=""
          width={180}
          height={180}
        />
      {/* )} */}
      <div className={styles.headerInfos}>
        <h3 className={styles.artist}>BAND MAID</h3>
        <h1 className={styles.title}>WORLD DOMINATION</h1>
      </div>
    </div>
  );
};

export default Header;
