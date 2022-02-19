import React, { useEffect } from "react";

import { FaPlay } from "react-icons/fa";
import { GiConsoleController, GiPauseButton } from "react-icons/gi";

import { BsFillSkipBackwardFill, BsFillSkipForwardFill } from "react-icons/bs";

import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";

import { currentPlaylistState, currentSongState } from "../../atoms/audioAtom";

import { useRecoilValue, useRecoilState } from "recoil";

const AudioControlesCenter = ({ isPlaying, handlePlayPause, audioElement }) => {
  const currentPlaylist = useRecoilValue(currentPlaylistState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

  // Set the next or previous song
  const setNextSong = (song) => {
    if (song === "previous") {
      
      setCurrentSong({
        // Check the current song in the playlist based on it's index
        ...currentPlaylist[currentSong.songIdx - 1],
        songIdx: currentSong.songIdx - 1,
      });
    } else {
      setCurrentSong({
        ...currentPlaylist[currentSong.songIdx + 1],
        songIdx: currentSong.songIdx + 1,
      });
    }
  };

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
