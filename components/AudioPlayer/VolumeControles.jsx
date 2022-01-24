import React, { useState, useEffect } from "react";

import RangeInput from "../_Core/RangeInput";

import styles from "../../styles/AudioPlayer.module.scss";

const VolumeControles = ({audioRef}) => {

  const [volumeInput, setVolumeInput] = useState({
    values: [1],
    max: 1,
    min: 0,
    step: 0.05,
  });


  useEffect(() => {
    const volume = audioRef.current.volume  
    setVolumeInput((volumeInput) => ({...volumeInput, values:[volume]}))
  }, [audioRef.current?.loadedmetadata,]);


  const changeVolume = (values) => {
    setVolumeInput({ ...volumeInput, values: [values] });
    audioRef.current.volume = values;
  };


  return (
    <div>
      <RangeInput
        values={volumeInput.values}
        min={volumeInput.min}
        max={volumeInput.max}
        step={volumeInput.step}
        updateValues={(values) =>
            changeVolume(values)
        }
        width="100px"
      />
    </div>
  );
};

export default VolumeControles;
