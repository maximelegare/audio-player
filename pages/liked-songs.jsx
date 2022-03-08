import React, { useEffect } from "react";

import RowList from "../components/_Partials/List/RowList/RowList";
import Header from "../components/_Partials/Header";

import { useAudioPlayer } from "../hooks/AudioHooks";
import { sql_query_string } from "../lib/db";

import likedSongImg from "../public/assets/SVG/liked.svg";
import PageLayout from "../components/Layout/PageLayout";
function LikedSongs({ likedSongs }) {
  const { likedSongsPlaylist, setLikedSongsPlaylist } = useAudioPlayer();

  useEffect(() => {
    setLikedSongsPlaylist(likedSongs);
  }, [likedSongs]);

  return (
    <div>
      <Header title="Liked Songs" smallTitle="Playlist" src={likedSongImg} />
      <PageLayout>
        <RowList data={likedSongsPlaylist} />
      </PageLayout>
    </div>
  );
}

export default LikedSongs;

export async function getServerSideProps() {
  const res = await sql_query_string(`
  SELECT DISTINCT (a.title), s.duration, s.title, s.liked, s.album, s.title_route as song_route, a.title_route as album_route, s.streaming_url, s.RP_streaming_path, a.artist_route, a.picture_url, a.artist
  FROM songs s
  JOIN albums a 
  ON a.title = s.album
  WHERE s.liked = 1
  `);
  const data = JSON.parse(JSON.stringify(res));

  

  return {
    props: {
      likedSongs: data,
    },
  };
}
