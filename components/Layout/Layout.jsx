import React from "react";
import styles from "../../styles/Index.module.scss"

import SideBar from "../SideBar/SideBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

const Layout = ({ children }) => {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.top}>
          <SideBar />
          {children}
        </div>
        <AudioPlayer
          title="This is a long long long long long skhfakajfh title"
          artist="Maxime Légaré"
          fileUrl="https://docs.google.com/uc?export=open&amp;id=1Tso7ly-_FthVJC-lIdB38Z-6BcY6VeJW"
          imgUrl="https://upload.wikimedia.org/wikipedia/en/8/8e/World_Domination_%28Band-Maid_album%29.png"
        />
      </main>
    </div>
  );
};

export default Layout;
