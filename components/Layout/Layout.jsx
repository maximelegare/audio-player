import React, { useEffect } from "react";
import styles from "../../styles/Layout.module.scss";

import SideBar from "../SideBar/SideBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { Scrollbar } from "react-scrollbars-custom";

import { useRecoilValue } from "recoil";
import { currentSongState } from "../../atoms/audioAtom";


const Layout = ({ children }) => {
  const currentSong = useRecoilValue(currentSongState)

  useEffect(() => {
      console.log(currentSong.streaming_url)
      console.log(currentSong.title)
  },[currentSong])

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.top}>
          <SideBar />

          <Scrollbar noScrollX style={{ width: "100%", height: "100%" }}>
            {children}
          </Scrollbar>
        </div>
        <AudioPlayer
          title={currentSong.title}
          artist={currentSong.artist}
          fileUrl="https://docs.google.com/uc?export=open&id=1kax8SwNLDKXFgMiSZDtw9V_JlRlt8XWF"
          imgUrl={currentSong.picture_url}
          duration={currentSong.duration}
        />
      </main>
    </div>
  );
};
"https://docs.google.com/uc?export=open&amp;id=1kax8SwNLDKXFgMiSZDtw9V_JlRlt8XWF"



"http://docs.google.com/uc?export=open&id=1kax8SwNLDKXFgMiSZDtw9V_JlRlt8XWF"


export default Layout;



"1hrR3q631UqMM7mV-NeYTxymjPCsHUrdC"