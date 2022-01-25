import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/AudioPlayer.module.scss";


import ProgressBar from "../AudioPlayer/ProgressBar";

import InfosAlbumPlaying from "./InfosAlbumPlaying";
import AudioControlesCenter from "./AudioControlesCenter";

import VolumeControles from "./VolumeControles";

const AudioPlayer = ({ fileUrl, title, artist, album, imgUrl }) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);

  const [progressInput, setRangeInput] = useState({
    values: [0],
    max: 100,
    min: 0,
    step: 1,
  });

  // references
  const animationRef = useRef(null); // Animation of the Range input

  const audioPlayer = useRef(null); // AudioPlayer which is in child component




  useEffect(() => {

    // set the max duration
    const seconds = Math.floor(audioPlayer.current.duration);
    setRangeInput((rangeInput) => ({ ...rangeInput, max: seconds }));
  }, [audioPlayer.current?.loadedmetadata]);


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
    setRangeInput({
      ...progressInput,
      values: [audioPlayer.current.currentTime],
    });

    // call itself to always do the animation
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  //   when a user drag the knob, it updates the progress-bar
  const changeRange = (values) => {
    setRangeInput({ ...progressInput, values: [values] });
    audioPlayer.current.currentTime = values;
  };

  const backFive = () => {
    const values = Number(audioPlayer.current.currentTime - 5);
    setRangeInput({ ...progressInput, values: [values] });
    changeRange(values);
  };

  const forwardFive = () => {
    const values = Number(audioPlayer.current.currentTime + 5);
    setRangeInput({ ...progressInput, values: [values] });
    changeRange(values);
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.layout}>
        <InfosAlbumPlaying title={title} artist={artist} imgUrl={imgUrl} />
        <div className={styles.controles}>
          <AudioControlesCenter
            isPlaying={isPlaying}
            handlePlayPause={handleClickPlayPause}
            handleBackFive={backFive}
            handleForwardFive={forwardFive}
            audioElement={
              <audio
                ref={audioPlayer}
                src={fileUrl}
                preload="metadata"
              />
            }
          />
          <ProgressBar
            values={progressInput.values}
            min={progressInput.min}
            max={progressInput.max}
            step={progressInput.step}
            updateValues={(values) => changeRange(values)}
            width="max(30vw, 300px)"
          />
        </div>
        <VolumeControles audioRef={audioPlayer}/>
      </div>
    </div>
  );
};
export { AudioPlayer };
