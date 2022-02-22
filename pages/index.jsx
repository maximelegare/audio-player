import Head from "next/head";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import styles from "../styles/Index.module.scss";
import { getProviders, signIn, signOut } from "next-auth/react";
import SideBar from "../components/SideBar/SideBar";
// import Center from "../components/Artist/Center";

import { sql_select } from "../lib/db";
import {useSetRecoilState} from "recoil"
import { customPlaylistsState } from "../atoms/audioAtom";
import { useEffect } from "react";


export default function Home({ playlists }) {

  const setPlaylist = useSetRecoilState(customPlaylistsState)

  // Set the playlist in recoil when initialize
  useEffect(() => {
    setPlaylist(playlists)
  },[playlists])


  return (
    <div className={styles.container}>
      
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await sql_select(
    "SELECT title, route, id from playlists"
  );
  const playlists = JSON.parse(JSON.stringify(res));

  return { props: { playlists  } };
}
