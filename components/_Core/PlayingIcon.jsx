import React from "react";

import styles from "../../styles/_Core/PlayingIcon.module.scss";

import { isPlayingState } from "../../atoms/audioAtom";
import { useRecoilValue } from "recoil";
const PlayingIcon = () => {

  const isPlaying = useRecoilValue(isPlayingState)  

  return (
    <div className={styles.container}>
      <span className={`${styles.col} ${!isPlaying && styles.paused}`}></span>
      <span className={`${styles.col} ${!isPlaying && styles.paused}`}></span>
      <span className={`${styles.col} ${!isPlaying && styles.paused}`}></span>
    </div>
  );
};

export default PlayingIcon;
