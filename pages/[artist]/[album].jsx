/* eslint-disable import/no-anonymous-default-export */

import React from "react";

import { sql_select } from "../../lib/db";

import Header from "../../components/_Partials/Header";
import List from "../../components/_Partials/List/RowList/RowList";

const album = ({ album }) => {
  return (
    <div>
      <Header
        title={album[0]?.album}
        src={album[0]?.picture_url}
        smallTitle={album[0]?.artist}
      />
      <List data={album} />
    </div>
  );
};

export default album;

export async function getServerSideProps({ params }) {
  const albumUrl = `${params.artist}/${params.album}`;

  const res = await sql_select(
    `SELECT songs.title, songs.album, songs.streaming_url, albums.picture_url, albums.artist, songs.duration FROM songs JOIN albums ON songs.album = albums.title WHERE albums.title_route = '${albumUrl}'`
  );
  const album = JSON.parse(JSON.stringify(res));
  return { props: { album: album } };
}
