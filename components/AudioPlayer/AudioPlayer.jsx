import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";

import ProgressBar from "../AudioPlayer/ProgressBar";

import InfosAlbumPlaying from "./InfosAlbumPlaying";
import AudioControlesCenter from "./AudioControlesCenter";

import VolumeControles from "./VolumeControles";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlayingState } from "../../atoms/audioAtom";

import { currentSongState, currentPlaylistState } from "../../atoms/audioAtom";

const AudioPlayer = ({ fileUrl, title, artist, album, imgUrl, duration }) => {
  // Global state
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const currentPlaylist = useRecoilValue(currentPlaylistState);

  // Progress input vales
  const [progressInput, setRangeInput] = useState({
    values: [0],
    min: 0,
    step: 1,
  });

  const [max, setMax] = useState(100); // maximum time of the range input (duration of the song)

  // references
  const animationRef = useRef(null); // Animation of the Range input

  const audioPlayer = useRef(null); // AudioPlayer which is in child component

  // set the max duration when metadata are loaded
  useEffect(() => {
    const seconds = Math.floor(duration);
    setMax(seconds);
  }, [audioPlayer.current?.loadedmetadata, duration]);

  // animation that updates the range while it's playing
  const whilePlaying = () => {
    setRangeInput({
      ...progressInput,
      values: [audioPlayer.current.currentTime],
    });

    // call itself to always do the animation
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  // Set play/pause based on isPlaying value & when file changes
  useEffect(() => {
    if (isPlaying) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying); // Start range input animation
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current); // Stop range input animation
    }
  }, [isPlaying, fileUrl]);

  useEffect(() => {
 
    if (Math.round(audioPlayer.current.currentTime) === duration) {
      setCurrentSong({
        ...currentPlaylist[currentSong.songIdx + 1],
        songIdx: currentSong.songIdx + 1,
      });
    }
  }, [audioPlayer.current?.currentTime, duration]);




  // when a user drag the knob, it updates the progress-bar
  const changeRange = (values) => {
    setRangeInput({ ...progressInput, values: [values] });
    audioPlayer.current.currentTime = values;
  };

  return (
    <div className={styles.audioPlayer}>
      <div className={styles.layout}>
        <InfosAlbumPlaying title={title} artist={artist} imgUrl={imgUrl} />
        <div className={styles.controles}>
          <AudioControlesCenter
            isPlaying={isPlaying}
            handlePlayPause={() => setIsPlaying(!isPlaying)}
            audioElement={
              <audio ref={audioPlayer} src={fileUrl} preload="metadata">
                <source src={fileUrl} />
              </audio>
            }
          />
          <ProgressBar
            values={progressInput.values}
            min={progressInput.min}
            max={max}
            step={progressInput.step}
            updateValues={(values) => changeRange(values)}
            width="max(30vw, 300px)"
          />
        </div>
        <VolumeControles audioRef={audioPlayer} />
      </div>
    </div>
  );
};
export { AudioPlayer };
