import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";
import PageLayout from "../../../Layout/PageLayout";

import { currentPlaylistState } from "../../../../atoms/audioAtom";


import { useAudioPlayer } from "../../../../hooks/AudioHooks";

const RowList = ({ data }) => {
  
  const { setPlaylistAndSong } = useAudioPlayer();

  let songNumber = 0;
  return (
    <PageLayout>
      <RowHeader />

      {data.map(({ title, ...otherProps }, idx) => {
        songNumber++;
        return (
          <ListElement
            key={title}
            title={title}
            songNumber={songNumber}
            idx={idx}
            {...otherProps}
            setPlaylistBasedOnSongSelected={(songIdx) =>
              setPlaylistAndSong(songIdx, data)
            }
          />
        );
      })}
    </PageLayout>
  );
};

export default RowList;
