import React from "react";
import RangeInput from "../_Core/RangeInput";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss"

import { calculateTime } from "../../lib/utilities";


const ProgressBar = ({values, min, max, step, updateValues, width}) => {
  return (
    <div className={styles.rangeBar}>
      <div className={styles.currentTime}>
        {calculateTime(values[0])}
      </div>
      <RangeInput
        values={values}
        min={min}
        max={max}
        step={step}
        updateValues={updateValues}
        width={width}
      />
      <div className={styles.duration}>{calculateTime(max | 0)}</div>
    </div>
  );
};

export default ProgressBar;
