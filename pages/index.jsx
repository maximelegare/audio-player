import Head from "next/head";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import styles from "../styles/Index.module.scss";
import { getProviders, signIn, signOut } from "next-auth/react";
import SideBar from "../components/SideBar/SideBar";
// import Center from "../components/Artist/Center";

import { sql_query_string } from "../lib/db";
import { useSetRecoilState } from "recoil";
import { customPlaylistsState } from "../atoms/audioAtom";
import { useEffect } from "react";
import Header from "../components/_Partials/Header";
import GridList from "../components/_Partials/List/GridList/GridList";
import BigCard from "../components/Card/BigCard";
import PageLayout from "../components/Layout/PageLayout";

export default function Home({ playlists }) {
  // const setPlaylist = useSetRecoilState(customPlaylistsState)



  return (
    <div className={styles.container}>
      <Header title="Good Morning!" />
      <PageLayout>
        <BigCard />
        <GridList data={playlists} variant="bigCard" />
      </PageLayout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await sql_query_string(`
  SELECT p.title, p.route, a.picture_url
  FROM playlists p 
  JOIN song_playlist sp 
  ON sp.playlist = p.title  
  JOIN songs s
  ON s.title_route = sp.song_route
  JOIN albums a 
  ON a.title = s.album
  ORDER BY p.route
  `);

  const data = JSON.parse(JSON.stringify(res));

  const formatedPlaylists = {};

  // Map through each playlist
  data.map((playlist) => {
    // if in formatedPlaylists, key playlist.route is not there
    if (!formatedPlaylists[playlist.route]) {
      // Create one
      formatedPlaylists[playlist.route] = {
        title: playlist.title,
        route: playlist.route,
        images: [],
      };
    }

    //  Return image from images which  is the same as playlist.picture_url
    const formatedPlaylistImage = formatedPlaylists[
      playlist.route
    ].images.filter((image) => image.picture_url === playlist.picture_url);

    // If nothing returned, add to []
    if (formatedPlaylistImage.length === 0) {
      formatedPlaylists[playlist.route].images.push({
        picture_url: playlist.picture_url,
      });
    }
  });

  // Retransform in an []
  const mapObjectToArray = Object.values(formatedPlaylists);

  return {
    props: {
      playlists: mapObjectToArray,
    },
  };
}
