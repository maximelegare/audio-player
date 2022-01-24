import React from "react";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

import styles from "../../styles/AudioPlayer.module.scss";

const AudioControlesCenter = ({
  isPlaying,
  handlePlayPause,
  handleBackFive,
  handleForwardFive,
//   forwardedRef,
  audioElement
}) => {
  return (
    <div className={styles.controlesButtons}>
      {
          audioElement
      }  
      <button className={styles.forwardBackward} onClick={handleBackFive}>
        <GoArrowLeft className={styles.arrow} />
      </button>

      <button onClick={handlePlayPause} className={styles.playPause}>
        {isPlaying ? <GiPauseButton /> : <FaPlay className={styles.play} />}
      </button>

      <button className={styles.forwardBackward} onClick={handleForwardFive}>
        <GoArrowRight className={styles.arrow} />
      </button>
    </div>
  );
};

export default AudioControlesCenter;
