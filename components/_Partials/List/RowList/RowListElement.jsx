import React, { useState, useEffect } from "react";
import styles from "../../../../styles/List/RowList.module.scss";

import CustomImage from "../../../_Core/CustomImage";

import { calculateTime } from "../../../../lib/utilities";
import PlayingIcon from "../../../_Core/PlayingIcon";

import { useAudioPlayer } from "../../../../hooks/AudioHooks";

import Dropdown from "../../../_Core/DropdownMenu/DropownMenu";

import DropdownMenuSong from "../../../_Core/DropdownMenu/DropdownMenuSong";

import CustomButton from "../../../_Core/CustomButton";
import { GiPauseButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";

import { useRecoilState } from "recoil";
import { highlightedSongState } from "../../../../atoms/audioAtom";

const RowListElement = ({
  song,
  idx,
  setPlaylistBasedOnSongClicked,
  options,
}) => {
  const [highlightedSong, setHighlightedSong] =
    useRecoilState(highlightedSongState);

  const { title, artist, picture_url, album, duration, song_route } = song;

  const { currentSong, setIsPlaying, isPlaying, setPlaylistAndSong } =
    useAudioPlayer();

  const [hover, setHover] = useState(false);

  // Pass the song clicked to the parent for it to set the song & playlist when clicked
  const handleSongDoubleClick = (e) => {
    setPlaylistBasedOnSongClicked(idx);
    setIsPlaying(true);
  };

  const handleSongClick = (e) => {
    // If no highlight when click
    // Set only this song as playlist & start playing
    // Used in search CustomInputDropdown
    if (options?.noHighlightWhenClicked) {
      setPlaylistAndSong(0, [song]);
      setIsPlaying(true);
      // Highlight song
    } else {
      setHighlightedSong(song);
    }
  };

  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    setPlaylistBasedOnSongClicked(idx);
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`${styles.rowListContainer} ${styles.listElement}
       ${hover && styles.hover}
       ${
         // Highlight the song when clicked
         idx !== undefined &&
         highlightedSong.song_route === song_route &&
         styles.highlight
       }
       `}
      style={{ marginBottom: options?.condensed && "10px" }}
      onClick={handleSongClick}
      onDoubleClick={handleSongDoubleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`${styles.firstThird} ${styles.section}`}>
        <div
          className={
            // If there is no idx, remove margin right between number & image
            idx !== undefined ? styles.numberContainer : undefined
          }
        >
          {
            // Show if idx is not undefined (Cannot use !idx => 0 is false)
            idx !== undefined && (
              <>
                {
                  // If hover, show play/pause icon
                  hover ||
                  (highlightedSong.song_route === song_route &&
                    currentSong.song_route !== song_route) ? (
                    <CustomButton
                      handleClick={handlePlayPauseClick}
                      variant="play-small"
                    >
                      {
                        // show pause if it's the current song playing
                        // Or show play for the other ones
                        isPlaying && currentSong.song_route === song_route ? (
                          <GiPauseButton />
                        ) : (
                          <FaPlay className={styles.playIcon} />
                        )
                      }
                    </CustomButton>
                  ) : (
                    // Otherwise, if current song, show playing icon
                    <>
                      {currentSong.song_route === song_route ? (
                        <PlayingIcon />
                      ) : (
                        // Otherwise show number
                        <p className={styles.number}>{idx + 1}</p>
                      )}
                    </>
                  )
                }
              </>
            )
          }
        </div>
        <div className={styles.image}>
          <CustomImage
            width={options?.imgWidth || 50}
            height={options?.imgHeight || 50}
            src={picture_url}
            alt=""
          />
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
      {album && <p>{album}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 35px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {duration && <p className={styles.time}>{calculateTime(duration)}</p>}
        <div
          // To prevent the song from starting when clicked
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {!options?.noOptionsIcon &&
            // If a song is highlighted (clicked and stay) or Hover, show options
            (highlightedSong.song_route === song_route || hover) && (
              <Dropdown menuItem={<DropdownMenuSong song={song} />} />
            )}
        </div>
      </div>
    </div>
  );
};

export default RowListElement;
