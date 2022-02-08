import React from "react";
import styles from "../../styles/Header/Header.module.scss";
import CustomImage from "../_Core/CustomImage";

const Header = ({ title, smallTitle, src }) => {
  return (
    <div className={styles.container}>
      {src && <CustomImage src={src} alt="" width={180} height={180} />}

      <div className={styles.headerInfos}>
        {smallTitle && (
          <h3 className={styles.artist}>{smallTitle.toUpperCase()}</h3>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
};

export default Header;
