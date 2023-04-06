import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "../../styles/AudioPlayer/AudioPlayer.module.scss";

import ProgressBar from "../AudioPlayer/ProgressBar";

import InfosAlbumPlaying from "./InfosAlbumPlaying";
import AudioControlesCenter from "./AudioControlesCenter";

import VolumeControles from "./VolumeControles";

import { useAudioPlayer } from "../../hooks/AudioHooks";

const AudioPlayer = ({ fileUrl, title, artist, album, imgUrl, duration, provider }) => {
  const {
    isPlaying,
    setIsPlaying,
    spotifyIsPlaying,
    setSpotifyIsPlaying,
    progressInput,
    max,
    audioPlayer,
    changeRange,
  } = useAudioPlayer(fileUrl, duration);

  const handlePlayPause = (prov) => {
    switch (prov){
      case "hodei":{
        setIsPlaying(!isPlaying)
      }
      case "spotify":{
        setSpotifyIsPlaying(!spotifyIsPlaying)
      }
    }
  }


  return (
    <>
      <div className={styles.audioPlayer}>
        <div className={styles.layout}>
          <InfosAlbumPlaying title={title} artist={artist} imgUrl={imgUrl} />
          <div className={styles.controles}>
            <AudioControlesCenter
              isPlaying={isPlaying || spotifyIsPlaying}
              handlePlayPause={() => handlePlayPause(provider)}
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
    </>
  );
};
export { AudioPlayer };
