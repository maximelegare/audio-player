import React, { useEffect } from "react";
import styles from "../../styles/Layout.module.scss";

import SideBar from "../SideBar/SideBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { Scrollbar } from "react-scrollbars-custom";

import { useAudioPlayer } from "../../hooks/AudioHooks";
import Search from "../Search/Search";
const Layout = ({ children }) => {
  const { currentSong } = useAudioPlayer();

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.top}>
          <SideBar />

          <Scrollbar
            noScrollX
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{position:"relative"}}>
              <Search />
              <div>{children}</div>
            </div>
          </Scrollbar>
        </div>
        <AudioPlayer
          title={currentSong.title}
          artist={currentSong.artist}
          fileUrl={currentSong.streaming_url}
          imgUrl={currentSong.picture_url}
          duration={currentSong.duration}
        />
      </main>
    </div>
  );
};

export default Layout;
