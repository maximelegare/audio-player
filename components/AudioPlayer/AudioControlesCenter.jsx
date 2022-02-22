import React from "react";

import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";

import CustomButton from "../_Core/CustomButton";

import { useAudioPlayer } from "../../hooks/AudioHooks";

const AudioControlesCenter = ({ isPlaying, handlePlayPause, audioElement }) => {

  const {setNextSong} = useAudioPlayer()

  
  return (
    <div className={styles.controlesButtons}>
      {audioElement}
      <CustomButton
        variant="forwardBackward"
        handleClick={() => setNextSong("previous")}
      >
        <BsFillSkipBackwardFill className={styles.arrow} />
      </CustomButton>

      <CustomButton handleClick={handlePlayPause} variant="play">
        {isPlaying ? <GiPauseButton /> : <FaPlay className={styles.playIcon} />}
      </CustomButton>

      <CustomButton
        variant="forwardBackward"
        handleClick={() => setNextSong("next")}
      >
        <BsFillSkipForwardFill className={styles.arrow} />
      </CustomButton>
    </div>
  );
};

export default AudioControlesCenter;
