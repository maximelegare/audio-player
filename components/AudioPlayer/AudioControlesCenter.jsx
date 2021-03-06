import React from "react";

import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";

import CustomButton from "../_Core/CustomButton";

import { useAudioPlayer } from "../../hooks/AudioHooks";

import RepeatIcon from "../_Core/Icons/RepeatIcon";
import RandomIcon from "../_Core/Icons/RandomIcon";

const AudioControlesCenter = ({ isPlaying, handlePlayPause, audioElement }) => {
  const {
    setNextSong,
    repeatValue,
    changeRepeatValue,
    randomValue,
    changeRandomValue,
  } = useAudioPlayer();

  return (
    <div className={styles.controlesButtons}>
      {audioElement}
      <CustomButton variant="iconOnly" handleClick={() => changeRandomValue(randomValue)}>
        <RandomIcon value={randomValue}/>
      </CustomButton>
      <CustomButton
        variant="iconOnly"
        handleClick={() => setNextSong("previous")}
      >
        <BsFillSkipBackwardFill />
      </CustomButton>

      <CustomButton handleClick={handlePlayPause} variant="play">
        {isPlaying ? <GiPauseButton /> : <FaPlay className={styles.playIcon} />}
      </CustomButton>

      <CustomButton variant="iconOnly" handleClick={() => setNextSong("next")}>
        <BsFillSkipForwardFill />
      </CustomButton>
      <CustomButton
        variant="iconOnly"
        handleClick={() => changeRepeatValue(repeatValue)}
      >
        <RepeatIcon value={repeatValue} />
      </CustomButton>
    </div>
  );
};

export default AudioControlesCenter;
