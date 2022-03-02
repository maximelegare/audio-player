import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";
import PageLayout from "../../../Layout/PageLayout";

import { useAudioPlayer } from "../../../../hooks/AudioHooks";

const RowList = ({ data }) => {
  const { setPlaylistAndSong } = useAudioPlayer();

  return (
    <>
      <RowHeader />
      {data?.map((song, idx) => {
        return (
          <ListElement
            key={song.title}
            song={song}
            idx={idx}
            setPlaylistBasedOnSongClicked={(songIdx) =>
              setPlaylistAndSong(songIdx, data)
            }
          />
        );
      })}
    </>
  );
};

export default RowList;
