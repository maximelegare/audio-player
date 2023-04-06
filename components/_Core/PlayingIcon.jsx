import React from "react";

import styles from "../../styles/_Core/PlayingIcon.module.scss";

import { useAudioPlayer } from "../../hooks/AudioHooks";


const PlayingIcon = () => {

  const {isPlaying, spotifyIsPlaying} = useAudioPlayer()  

  return (
    <div className={styles.container}>
      <span className={`${styles.col} ${!isPlaying && !spotifyIsPlaying && styles.paused}`}></span>
      <span className={`${styles.col} ${!isPlaying && !spotifyIsPlaying && styles.paused}`}></span>
      <span className={`${styles.col} ${!isPlaying && !spotifyIsPlaying && styles.paused}`}></span>
    </div>
  );
};

export default PlayingIcon;
