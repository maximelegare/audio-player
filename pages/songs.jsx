import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import Header from "../components/_Partials/Header";
import RowList from "../components/_Partials/List/RowList/RowList";

import { sql_select } from "../lib/db";

const songs = ({ songs }) => {
  console.log(songs);
  return (
    <div>
      <Header title="All Songs" />
      <PageLayout>
        <RowList data={songs} />
      </PageLayout>
      
    </div>
  );
};

export default songs;

export async function getServerSideProps(context) {
  const res = await sql_select(
    {},
    "SELECT songs.title, songs.album, songs.streaming_url, albums.picture_url, albums.artist, songs.duration  FROM songs JOIN albums ON songs.album = albums.title"
  );
  const songs = JSON.parse(JSON.stringify(res));
  return { props: { songs } };
}
