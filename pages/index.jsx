import Head from "next/head";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import styles from "../styles/Index.module.scss";
import { getProviders, signIn, signOut } from "next-auth/react";
import SideBar from "../components/SideBar/SideBar";
// import Center from "../components/Artist/Center";

// import { sql_query_string } from "../lib/db";
import { useSetRecoilState } from "recoil";
import { customPlaylistsState } from "../atoms/audioAtom";
import { useEffect } from "react";
import Header from "../components/_Partials/Header";
import GridList from "../components/_Partials/List/GridList/GridList";
import BigCard from "../components/Card/BigCard";
import PageLayout from "../components/Layout/PageLayout";
export default function Home() {
  // const setPlaylist = useSetRecoilState(customPlaylistsState)

  return (
    <div className={styles.container}>
      <Header title="Good Morning!" />
      <PageLayout>
        <BigCard />
        {/* <GridList data={}/>  */}
      </PageLayout>
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: {} };
}
