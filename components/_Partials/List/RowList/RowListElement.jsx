import React, { useState } from "react";
import styles from "../../../../styles/List/RowList.module.scss";

import CustomImage from "../../../_Core/CustomImage";

import { calculateTime } from "../../../../lib/utilities";
import PlayingIcon from "../../../_Core/PlayingIcon";

import { useAudioPlayer } from "../../../../hooks/AudioHooks";

import Dropdown from "../../../_Core/DropdownMenu/DropownMenu";

import DropdownMenuSong from "../../../_Core/DropdownMenu/DropdownMenuSong";

const RowListElement = ({
  id,
  title,
  artist,
  picture_url,
  album,
  duration,
  songNumber,
  setPlaylistBasedOnSongSelected,
  song_route,
  track_no,
  idx,
}) => {
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
            <p className={styles.number}>{songNumber}</p>
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
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {optionsVisibility && (
            <Dropdown
              menuItem={
                <DropdownMenuSong />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RowListElement;
