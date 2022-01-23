import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/AudioPlayer.module.scss";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { getTrackBackground, Range } from "react-range";
import RangeInput from "../_Core/RangeInput";

const AudioPlayer = ({ fileUrl, title, artist, album, imgUrl }) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [rangeInput, setRangeInput] = useState({
    values: [0],
    max: 100,
    min: 0,
    step:1
  });

  const [scroll, setScroll] = useState({
    title: false,
    artist: false,
  });

  // reference
  const audioPlayer = useRef(null); // Reference audio component

  const progressBar = useRef(null); // Reference the progress-bar

  const animationRef = useRef(null); // Animation

  const titleRef = useRef();
  const artistRef = useRef();

  useEffect(() => {
    if (titleRef.current) {
      if (titleRef.current.offsetWidth === 300) {
        setScroll({ ...scroll, title: true });
      }
      if (artistRef.current.offsetWidth === 300) {
        setScroll({ ...scroll, artist: true });
      }
    }
    console.log(scroll);
  }, [titleRef.current, artistRef.current]);

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

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);

    // progressBar.current.max = seconds;

    // setDuration(seconds);
    setRangeInput({ ...rangeInput, max: seconds });

    // make sure the audioPlayer exists
  }, [audioPlayer?.current?.loadedmetadata]);

  //   animation that updates the range while it's playing
  const whilePlaying = () => {
    setRangeInput({ ...rangeInput, values: [audioPlayer.current.currentTime] });
    changePlayerCurrentTime();

    // call itself to always do the animation
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  //   when a user drag the knob, it updates the progress-bar
  const changeRange = (values) => {
    setRangeInput({ ...rangeInput, values: [values] });

    audioPlayer.current.currentTime = values;
    changePlayerCurrentTime(values);
  };

  //   updates the player current time (the range input)

  const changePlayerCurrentTime = (values) => {
    setCurrentTime(values);
  };

  // calculate the time that is displayed
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);

    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${returnedSeconds}`;
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
      <div className={styles.infosContainer}>
        <div className={styles.infosWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={imgUrl}
              alt=""
              width={80}
              height={75}
              objectFit="cover"
              className={styles.image}
            />
          </div>

          <div className={styles.infos}>
            <h3 ref={titleRef} className={styles.titleAnimation}>
              {title}
            </h3>
            <p ref={artistRef}>{artist}</p>
          </div>
        </div>
      </div>
      {/* <div></div> */}
      <div className={styles.controles}>
        <div className={styles.controlesButtons}>
          <audio ref={audioPlayer} src={fileUrl} preload="metadata"></audio>
          <button className={styles.forwardBackward} onClick={backFive}>
            <GoArrowLeft className={styles.arrow} />
          </button>

          <button onClick={handleClickPlayPause} className={styles.playPause}>
            {isPlaying ? <GiPauseButton /> : <FaPlay className={styles.play} />}
          </button>

          <button className={styles.forwardBackward} onClick={forwardFive}>
            <GoArrowRight className={styles.arrow} />
          </button>
        </div>
        <div className={styles.rangeBar}>
          <div className={styles.currentTime}>
            {calculateTime(rangeInput.values[0])}
          </div>

          {/* <input
            className={styles.progressBar}
            defaultValue="0"
            type="range"
            ref={progressBar}
            onChange={changeRange}
          /> */}

          {/* <Range
            step={1}
            min={rangeInput.min}
            max={rangeInput.max}
            ref={progressBar}
            values={rangeInput.values}
            onChange={(values) =>
              changeRange(values)
            }
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  width: "max(30vw, 300px)",
                  height: "20px",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  {...props}
                  ref={props.ref}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "max(30vw, 300px)",
                    borderRadius: "10px",
                    // backgroundColor: "#ffe3d4",
                    cursor: "pointer",
                    background: getTrackBackground({
                      values: rangeInput.values,
                      colors: ["#26c9c3", "#ffe3d4"],
                      min: rangeInput.min,
                      max: rangeInput.max,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged, value }) => (
              <div
                {...props}
                defaultValue={0}
                // className={}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#26c9c3",
                  visibility: isDragged ? "visible" : "hidden",
                  borderRadius: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              />
            )}
          /> */}
          <RangeInput
            values={rangeInput.values}
            min={rangeInput.min}
            max={rangeInput.max}
            step={rangeInput.step}
            updateValues={(values) => changeRange(values)}
          />

          <div className={styles.duration}>
            {calculateTime(audioPlayer?.current?.duration)}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export { AudioPlayer };
