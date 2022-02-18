import React from "react";

import styles from "../../../../styles/List/RowList.module.scss";

import { FiClock, FiHash } from "react-icons/fi";

const RowHeader = () => {
  return (
    <>
      <div className={`${styles.rowListContainer} ${styles.header}`}>
        <div className={styles.firstThird}>
          <div className={styles.numberContainer}>
            <FiHash className={styles.number} />
          </div>
          <div className={styles.infosContainer}>
            <h4>TITLE</h4>
          </div>
        </div>
        <h4>Album</h4>
        <FiClock className={styles.time} />
      </div>
      <hr style={{ marginBottom: "30px" }} />
    </>
  );
};

export default RowHeader;
