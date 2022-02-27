import React, { useState } from "react";
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

const RowListElement = ({ song, idx, setPlaylistBasedOnSongSelected }) => {
  const [highlightedSong, setHighlightedSong] =
    useRecoilState(highlightedSongState);

  const { title, artist, picture_url, album, duration, song_route } = song;

  const { currentSong, setIsPlaying, isPlaying } = useAudioPlayer();

  const [hover, setHover] = useState(false);

  // Pass the song clicked to the parent for it to set the song & playlist when clicked
  const handleSongClicked = (e) => {
    setPlaylistBasedOnSongSelected(idx);
    setIsPlaying(true);
  };

  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    setPlaylistBasedOnSongSelected(idx);
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`${styles.rowListContainer} ${styles.listElement}
       ${hover && styles.hover}
       ${highlightedSong.song_route === song_route && styles.highlight}
       `}
      onClick={() => setHighlightedSong(song)}
      onDoubleClick={handleSongClicked}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`${styles.firstThird} ${styles.section}`}>
        <div className={styles.numberContainer}>
          {
            // If hover, show play pause icon
            hover || highlightedSong.song_route === song_route ? (
              <CustomButton
                handleClick={handlePlayPauseClick}
                variant="play-small"
              >
                {isPlaying && currentSong.song_route === song_route ? (
                  <GiPauseButton />
                ) : (
                  <FaPlay className={styles.playIcon} />
                )}
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
          {
            ((highlightedSong.song_route === song_route || hover) && (
              <Dropdown menuItem={<DropdownMenuSong song={song} />} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RowListElement;
