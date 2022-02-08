import React from "react";
import styles from "../../styles/Layout.module.scss";

import SideBar from "../SideBar/SideBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { Scrollbar } from "react-scrollbars-custom";

const Layout = ({ children }) => {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.top}>
          <SideBar />
          <div className={styles.layout}>
            <Scrollbar style={{width:"100%", height:"100%"}}>{children}</Scrollbar>
          </div>
        </div>
        <AudioPlayer
          title="This is a long long long long long skhfakajfh title"
          artist="Maxime Légaré"
          fileUrl="https://docs.google.com/uc?export=open&amp;id=1Da0t_0VZUPPk1B-7dM-vHGcZS1t_Iwcn"
          imgUrl="https://docs.google.com/uc?id=1NRCIz_EIMagmy4l9Io_pZnE2513EVEaG"
        />
      </main>
    </div>
  );
};

export default Layout;
