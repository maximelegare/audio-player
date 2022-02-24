import React, { useState } from "react";
import styles from "../../../../styles/List/RowList.module.scss";

import CustomImage from "../../../_Core/CustomImage";

import { calculateTime } from "../../../../lib/utilities";
import PlayingIcon from "../../../_Core/PlayingIcon";

import { useAudioPlayer } from "../../../../hooks/AudioHooks";

import Dropdown from "../../../_Core/DropdownMenu/DropownMenu";

import DropdownMenuSong from "../../../_Core/DropdownMenu/DropdownMenuSong";

const RowListElement = ({song, idx, setPlaylistBasedOnSongSelected}) => {

  const {
    title,
    artist,
    picture_url,
    album,
    duration,
    song_route,
    } = song


  const { currentSong, setIsPlaying } = useAudioPlayer();

  const [optionsVisibility, setOptionsVisibility] = useState(false);

  // Pass the song clicked to the parent for it to set the song & playlist when clicked
  const handleSongClicked = (e) => {
    setPlaylistBasedOnSongSelected(idx);
    setIsPlaying(true);
  };

  return (
    <div
      className={`${styles.rowListContainer} ${styles.listElement}
       ${optionsVisibility && styles.optionsActive}
       `}
      onClick={handleSongClicked}
      onMouseEnter={() => setOptionsVisibility(true)}
      onMouseLeave={() => setOptionsVisibility(false)}
    >
      <div className={`${styles.firstThird} ${styles.section}`}>
        <div className={styles.numberContainer}>
          {currentSong.song_route === song_route ? (
            <PlayingIcon />
          ) : (
            <p className={styles.number}>{idx + 1}</p>
          )}
        </div>
        <div className={styles.image}>
          <CustomImage width={50} height={50} src={picture_url} alt="" />
        </div>
        <div className={styles.infosContainer}>
          <h5
            className={`${styles.title} ${
              currentSong.song_route === song_route && styles.currentSong
            }`}
          >
            {title}
          </h5>
          <p>{artist}</p>
        </div>
      </div>
      <p>{album}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 35px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <p className={styles.time}>{calculateTime(duration)}</p>
        <div
        // To prevent the song from starting when clicked
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {optionsVisibility && (
            <Dropdown
              menuItem={
                <DropdownMenuSong song={song}/>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RowListElement;
