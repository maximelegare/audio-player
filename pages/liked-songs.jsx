import React from "react";

import RowList from "../components/_Partials/List/RowList/RowList";
import Header from "../components/_Partials/Header";

import { useAudioPlayer } from "../hooks/AudioHooks";
import { sql_query_string } from "../lib/db";

function LikedSongs({ songs }) {
  return (
    <div>
      <Header title="Liked Songs" />
      <RowList data={songs} />
    </div>
  );
}

export default LikedSongs;

export async function getServerSideProps() {
  const res = await sql_query_string(`
  SELECT DISTINCT (a.title), s.duration, s.title, s.liked, s.album, s.title_route as song_route, a.title_route as album_route, s.streaming_url, a.artist_route, a.picture_url, a.artist
  FROM songs s
  JOIN albums a 
  ON a.title = s.album
  WHERE s.liked = 1

  `);

  const songs = JSON.parse(JSON.stringify(res));
  return {
    props: {
      songs: songs,
    },
  };
}
