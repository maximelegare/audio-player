import React from "react";

import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";


import { useAudioPlayer } from "../../hooks/AudioHooks";

const AudioControlesCenter = ({ isPlaying, handlePlayPause, audioElement }) => {

  const {setNextSong} = useAudioPlayer()

  
  return (
    <div className={styles.controlesButtons}>
      {audioElement}
      <button
        className={styles.forwardBackward}
        onClick={() => setNextSong("previous")}
      >
        <BsFillSkipBackwardFill className={styles.arrow} />
      </button>

      <button onClick={handlePlayPause} className={styles.playPause}>
        {isPlaying ? <GiPauseButton /> : <FaPlay className={styles.play} />}
      </button>

      <button
        className={styles.forwardBackward}
        onClick={() => setNextSong("next")}
      >
        <BsFillSkipForwardFill className={styles.arrow} />
      </button>
    </div>
  );
};

export default AudioControlesCenter;
