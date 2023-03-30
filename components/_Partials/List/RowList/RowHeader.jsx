import React from "react";

import styles from "../../../../styles/List/RowList.module.scss";

import { FiClock, FiHash } from "react-icons/fi";

const RowHeader = ({ topTitle, showImageSection }) => {
  return (
    <div>
      {showImageSection ? (
        <div className="flex gap-2 mb-2">
          <div className="w-40 h-40 bg-black rounded-md"></div>
          <div className="flex flex-col gap-3 justify-end">
            <p className="text-sm opacity-80">Spotify Album</p>
            <p className="text-6xl">Album</p>
            <p className="text-sm opacity-80">
              Artist&ensp;●&ensp;Year&ensp;●&ensp;5 songs,{" "}
              <span className="opacity-60">58 min 15 sec</span>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* {topTitle && <h2 className={styles.topTitle}>{topTitle}:</h2>} */}
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
        <FiClock className={styles.time} style={{ marginRight: "45px" }} />
      </div>
      <hr style={{ marginBottom: "30px" }} />
    </div>
  );
};

export default RowHeader;
