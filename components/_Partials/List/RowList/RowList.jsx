import React from "react";
import ListElement from "./RowListElement";
import RowHeader from "./RowHeader";
import PageLayout from "../../../Layout/PageLayout";

import { currentPlaylistState } from "../../../../atoms/audioAtom";
import { useSetRecoilState } from "recoil";
import { currentSongState } from "../../../../atoms/audioAtom";


const RowList = ({ data }) => {
  
  const setPlaylist = useSetRecoilState(currentPlaylistState)
  const setCurrentSong = useSetRecoilState(currentSongState)  

  // Set the current playlist based on the song clicked on child component
  const setPlaylistBasedOnSong = (songNumber) => {

    setPlaylist(data)

    // Set the current Song based on the song number (start at 1)
    setCurrentSong(data[songNumber-1])
    
  }
  

  let songNumber = 0;
  return (
    <PageLayout>
      <RowHeader />

      {data.map(({ title, ...otherProps }) => {
        songNumber++;
        return (
          <ListElement
            key={title}
            title={title}
            songNumber={songNumber}
            {...otherProps}
            setPlaylistBasedOnSongSelected={setPlaylistBasedOnSong}
          />
        );
      })}
    </PageLayout>
  );
};

export default RowList;
