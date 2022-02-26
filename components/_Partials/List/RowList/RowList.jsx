import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";
import PageLayout from "../../../Layout/PageLayout";

import { useAudioPlayer } from "../../../../hooks/AudioHooks";

const RowList = ({ data }) => {
  const { setPlaylistAndSong } = useAudioPlayer();

  let songNumber = 0;
  return (
    <>
      <RowHeader />

      {data?.map((song, idx) => {
        songNumber++;
        return (
          <ListElement
            key={song.title}
            song={song}
            idx={idx}
            setPlaylistBasedOnSongSelected={(songIdx) =>
              setPlaylistAndSong(songIdx, data)
            }
          />
        );
      })}
    </>
  );
};

export default RowList;
