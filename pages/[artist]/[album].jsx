/* eslint-disable import/no-anonymous-default-export */

import React from "react";

import { sql_query_string } from "../../lib/db";

import Header from "../../components/_Partials/Header";
import RowList from "../../components/_Partials/List/RowList/RowList";

const album = ({ album }) => {
  return (
    <div>
      <Header
        title={album[0]?.album}
        src={album[0]?.picture_url}
        smallTitle={album[0]?.artist}
      />
      <RowList data={album} />
    </div>
  );
};

export default album;

export async function getServerSideProps({ params }) {
  const albumUrl = `${params.artist}/${params.album}`;

  const res = await sql_query_string(`
    SELECT s.title, s.title_route as song_route, s.liked,  s.album, s.track_no, s.streaming_url, a.picture_url, a.artist, s.duration, a.title_route as album_route, a.artist_route 
    FROM songs s
    JOIN albums a
    ON s.album = a.title 
    WHERE a.title_route = '${albumUrl}' 
    ORDER BY s.track_no`
  );
  const album = JSON.parse(JSON.stringify(res));
  return { props: { album: album } };
}
