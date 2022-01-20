import React, { useState } from "react";

import styles from "../styles/AudioPlayer.module.scss";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

const AudioPLayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

 
  function handleClickPlayPause(){
      setIsPlaying(!isPlaying)
  }

  return (
    <div className={styles.audioPlayer}>
      <audio src="../assets/mp3/01_04_RIDE ON.m4a" preload="metadata"></audio>

      <button className={styles.forwardBackward}>
        <BsArrowLeftShort /> 30
      </button>

      <button onClick={handleClickPlayPause} className={styles.playPause}>{!isPlaying ? <GiPauseButton /> : <FaPlay className={styles.play}/>}</button>

      <button className={styles.forwardBackward}>
        30 <BsArrowRightShort /> 
      </button>

      <div className={styles.currentTime}>0:00</div>

      <div>
        <input className={styles.progressBar} type="range" />
      </div>

      <div className={styles.duration}>2:59</div>
    </div>
  );
};

export { AudioPLayer };
