import React, { useEffect } from "react";
import styles from "../../styles/Layout.module.scss";

import SideBar from "../SideBar/SideBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { Scrollbar } from "react-scrollbars-custom";
import { useRecoilValue } from "recoil";
import { searchSectionVisibilityState } from "../../atoms/generalAtom";
import { useMemo } from "react";

import { useAudioPlayer } from "../../hooks/AudioHooks";
import Search from "../Search/Search";
const Layout = ({ children }) => {
  const seachVisibility = useRecoilValue(searchSectionVisibilityState);
  const { currentSong } = useAudioPlayer();
  const memoizedValue = useMemo(() => <>{children}</>, [children]);

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
            <div style={{ position: "relative" }}>
              {seachVisibility && <Search />}
              <div>{memoizedValue}</div>
            </div>
          </Scrollbar>
        </div>
        <AudioPlayer
          title={currentSong.title}
          artist={currentSong.artist}
          fileUrl={`/api/stream-song${currentSong.RP_streaming_path}`}
          // fileUrl="api/stream-song"
          // fileUrl={currentSong.streaming_url}
          imgUrl={currentSong.picture_url}
          duration={currentSong.duration}
        />
      </main>
    </div>
  );
};

export default Layout;
