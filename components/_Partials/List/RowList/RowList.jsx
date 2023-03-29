import React, { use } from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";
import PageLayout from "../../../Layout/PageLayout";
import { useEffect } from "react";
import { useAudioPlayer } from "../../../../hooks/AudioHooks";

const RowList = ({ data, topHeaderTitle }) => {
  const { setPlaylistAndSong } = useAudioPlayer();

 
  return (
    <>
      <RowHeader topTitle={topHeaderTitle}></RowHeader>
      {data?.map((song, idx) => {
        console.log(song)
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
