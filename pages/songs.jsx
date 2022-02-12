import React from "react";
import Header from "../components/_Partials/Header";
import RowList from "../components/_Partials/List/RowList/RowList";

import { sql_select } from "../lib/db";

const songs = ({ songs }) => {
  return (
    <div>
      <Header title="All Songs" />
      
        <RowList data={songs} />
      
    </div>
  );
};

export default songs;

export async function getServerSideProps(context) {
  const res = await sql_select(
    {},
    // "SELECT DISTINCT (songs.title), songs.album, songs.streaming_url, albums.picture_url, albums.artist, songs.duration  FROM songs JOIN albums ON songs.album = albums.title"
    "SELECT DISTINCT (a.title), s.duration, s.title, s.streaming_url, a.artist FROM songs s JOIN albums a ON a.title = s.album"
  );
  const songs = JSON.parse(JSON.stringify(res));
  return { props: { songs } };
}
