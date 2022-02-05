import React, { useState, useEffect } from "react";

import RangeInput from "../_Core/RangeInput";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";

import {
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeOffFill,
  BsFillVolumeDownFill,
} from "react-icons/bs";

const VolumeControles = ({ audioRef }) => {

  // State
  const [volumeInput, setVolumeInput] = useState({
    values: [1],
    prevValue: null,
    max: 1,
    min: 0,
    step: 0.05,
  });

  const [prevVolume, setPrevVolume] = useState(null);

  const { values, max, min, step } = volumeInput;

  // Set the range input based on the volume
  useEffect(() => {
    const volume = audioRef.current.volume;

    setVolumeInput((volumeInput) => ({ ...volumeInput, values: [volume] }));
  }, [audioRef.current?.loadedmetadata]);

  // set the volume based on the input
  const changeVolume = (values) => {
    setVolumeInput({ ...volumeInput, values: [values] });
    audioRef.current.volume = values;
  };

  const mute = () => {
    const volume = audioRef?.current?.volume;

    // If current volume === 0
    if (volume === 0) {

      // Change volume with the previous volume value
      changeVolume(prevVolume);  
    } else {

      // Set the previous value & change the volume to 0
      setPrevVolume(volume);
      changeVolume(0);   
    }
  };

  // Set the icon based on the volume
  const setIcon = () => {
    const volume = audioRef?.current?.volume;

    if (volume >= 0.7) {
      return <BsFillVolumeUpFill className={styles.icon} />;
    }
    if (volume >= 0.4) {
      return <BsFillVolumeDownFill className={styles.icon} />;
    }
    if (volume >= 0.05) {
      return <BsFillVolumeOffFill className={styles.icon} />;
    }
    if (volume === 0) {
      return <BsFillVolumeMuteFill className={styles.icon} />;
    }
  };

  return (
    <div className={styles.volumeContainer}>
      <button className={styles.iconButton} onClick={mute}>
        {setIcon()}
      </button>
      <RangeInput
        values={values}
        min={min}
        max={max}
        step={step}
        updateValues={(values) => changeVolume(values)}
        width="100px"
      />
    </div>
  );
};

export default VolumeControles;
