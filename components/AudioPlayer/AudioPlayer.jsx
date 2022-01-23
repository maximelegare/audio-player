import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/AudioPlayer.module.scss";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { getTrackBackground, Range } from "react-range";
import RangeInput from "../_Core/RangeInput";

import InfosAlbumPlaying from "./InfosAlbumPlaying";
import AudioControlesCenter from "./AudioControlesCenter";

import { calculateTime } from "../../lib/calculateTime";

const AudioPlayer = ({ fileUrl, title, artist, album, imgUrl }) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);

  const [rangeInput, setRangeInput] = useState({
    values: [0],
    max: 100,
    min: 0,
    step: 1,
  });

  // references
  const animationRef = useRef(null); // Animation of the Range input

  const audioPlayerComponentRef = useRef(); // AudioPlayer which is in child component

  const [audioPlayer, setAudioPlayer] = useState(null); // Ref of AudioPlayer used in this component

  // set a local state containing the ref to be used in this component when the DOM is ready
  useEffect(() => {
    // set the ref value
    setAudioPlayer(audioPlayerComponentRef);

    // set the max duration
    const seconds = Math.floor(audioPlayerComponentRef.current.duration);
    setRangeInput((rangeInput) => ({ ...rangeInput, max: seconds }));
  }, [audioPlayerComponentRef.current?.loadedmetadata]);

  // need to get the previous value bc use state is asynchronous and wont have time to do conditionnal before it's done running
  function handleClickPlayPause() {
    const prevValue = isPlaying;

    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();

      //   start the range animation when pressed play
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      // pause the range animation when pressed play
      cancelAnimationFrame(animationRef.current);
    }
  }

  //   animation that updates the range while it's playing
  const whilePlaying = () => {
    setRangeInput({ ...rangeInput, values: [audioPlayer.current.currentTime] });

    // call itself to always do the animation
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  //   when a user drag the knob, it updates the progress-bar
  const changeRange = (values) => {
    setRangeInput({ ...rangeInput, values: [values] });
    audioPlayer.current.currentTime = values;
  };

  const backFive = () => {
    const values = Number(audioPlayer.current.currentTime - 5);
    setRangeInput({ ...rangeInput, values: [values] });
    changeRange(values);
  };

  const forwardFive = () => {
    const values = Number(audioPlayer.current.currentTime + 5);
    setRangeInput({ ...rangeInput, values: [values] });
    changeRange(values);
  };

  return (
    <div className={styles.audioPlayer}>
      <InfosAlbumPlaying title={title} artist={artist} imgUrl={imgUrl} />
      <div className={styles.controles}>
        <AudioControlesCenter
          isPlaying={isPlaying}
          fileUrl={fileUrl}
          handlePlayPause={handleClickPlayPause}
          handleBackFive={backFive}
          handleForwardFive={forwardFive}
          forwardedRef={audioPlayerComponentRef}
        />
        <RangeInput
          values={rangeInput.values}
          min={rangeInput.min}
          max={rangeInput.max}
          step={rangeInput.step}
          updateValues={(values) => changeRange(values)}
          time={true}
        />
      </div>
      <div></div>
    </div>
  );
};
export { AudioPlayer };
