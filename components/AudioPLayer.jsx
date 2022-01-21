import React, { useState, useRef, useEffect } from "react";

import styles from "../styles/AudioPlayer.module.scss";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";

const AudioPlayer = () => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [musicData, setMusicData] = useState(null);

  const [musicList, setMusicList] = useState([
    "http://k007.kiwi6.com/hotlink/gugxzndy8i/MojoWerkin.mp3",
    "http://k007.kiwi6.com/hotlink/63pvscg93o/Inner_voice.mp3",
  ]);

  // reference
  const audioPlayer = useRef(null); // Reference audio component

  const progressBar = useRef(null); // Reference the progress-bar

  const animationRef = useRef(null); // Animation

  const fetchMusic = async (song = "http://k007.kiwi6.com/hotlink/63pvscg93o/Inner_voice.mp3") => {
  
    const data = await fetch("http://localhost:3000/api/music-infos", {
      method: "POST",
      body: song,
    });
    const result = await data.json();
    setIsPlaying(false)
    setCurrentTime(0)
    setMusicData(result);
  };

  useEffect(() => {
    fetchMusic();
  }, []);

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

    progressBar.current.max = seconds;

    setDuration(seconds);
    // make sure the audioPlayer exists
  }, [audioPlayer?.current?.loadedmetadata]);

  //   animation that updates the range while it's playing
  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();

    // call itself to always do the animation
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  //   when a user drag the knob, it updates the progress-bar
  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  //   updates the player current time (the range input)
  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "$seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrentTime(progressBar.current.value);
  };

  // calculate the time that is displayed
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);

    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${returnedSeconds}`;
  };

  const backThirty = () => {
    //   console.log(audioPlayer.current.currentTime - 30)
    progressBar.current.value = Number(audioPlayer.current.currentTime - 30);
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(audioPlayer.current.currentTime + 30);
    changeRange();
  };

  return (
    <div>
      {musicList.map((song) => (
        <div onClick={() => fetchMusic(song)} key={song}>{song}</div>
      ))}
       <br />
       <div>{musicData?.data?.metadata.common.title}</div> 
       <div>{musicData?.data?.metadata.common.artist}</div> 

      <div className={styles.audioPlayer}>
        <audio
          ref={audioPlayer}
          src={musicData?.data?.url}
          preload="metadata"
        ></audio>

        <button className={styles.forwardBackward} onClick={backThirty}>
          <BsArrowLeftShort /> 30
        </button>

        <button onClick={handleClickPlayPause} className={styles.playPause}>
          {isPlaying ? <GiPauseButton /> : <FaPlay className={styles.play} />}
        </button>

        <button className={styles.forwardBackward} onClick={forwardThirty}>
          30 <BsArrowRightShort />
        </button>

        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        <div>
          <input
            className={styles.progressBar}
            defaultValue="0"
            type="range"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>

        <div className={styles.duration}>
          {calculateTime(musicData?.data?.metadata.format.duration)}
        </div>
      </div>
    </div>
  );
};
export { AudioPlayer };
