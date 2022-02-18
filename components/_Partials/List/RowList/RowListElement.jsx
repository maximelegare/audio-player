import React from "react";
import styles from "../../../../styles/List/RowList.module.scss";

import CustomImage from "../../../_Core/CustomImage";

import { calculateTime } from "../../../../lib/utilities";
import PlayingIcon from "../../../_Core/PlayingIcon";

import { currentSongState } from "../../../../atoms/audioAtom";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { isPlayingState } from "../../../../atoms/audioAtom";

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
  track_no
}) => {

  // To change styling of the song playing 
  const currentSong = useRecoilValue(currentSongState);

  const setIsPlaying = useSetRecoilState(isPlayingState)


  // Pass the song clicked to the parent for it to set the song & playlist when clicked
  const handleSongClicked = () => {
    setPlaylistBasedOnSongSelected(songNumber);
    setIsPlaying(true)
  };


  return (
    <div
      className={`${styles.rowListContainer} ${styles.listElement}`}
      onClick={() => handleSongClicked()}
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
          <h5 className={`${styles.title} ${currentSong.song_route === song_route && styles.currentSong}`}>{title}</h5>
          <p>{artist}</p>
        </div>
      </div>
      <p>{album}</p>
      <p className={styles.time}>{calculateTime(duration)}</p>
    </div>
  );
};

export default RowListElement;
