import React from "react";

import { sql_query_string } from "../../../lib/db";

import Header from "../../../components/_Partials/Header";
import RowList from "../../../components/_Partials/List/RowList/RowList";

import PageLayout from "../../../components/Layout/PageLayout";

const album = ({ album }) => {
  return (
    <>
      <Header
        title={album[0]?.album}
        src={album[0]?.picture_url}
        smallTitle={album[0]?.artist}
      />
      <PageLayout>
        <RowList data={album} />
      </PageLayout>
    </>
  );
};

export default album;


export async function getServerSideProps({ params }) {
  const albumUrl = `/${params.artist}/${params.album}`;

  const res = await sql_query_string(`
    SELECT s.id, s.title, s.title_route as song_route, s.liked,  s.album, s.track_no, s.streaming_url, s.RP_streaming_path, a.picture_url, a.artist, s.duration, a.title_route as album_route, a.artist_route, 'hodei' as provider 
    FROM songs s
    JOIN albums a
    ON s.album = a.title 
    WHERE a.title_route = ?
    ORDER BY s.track_no`, [`${albumUrl}`]);
  const album = JSON.parse(JSON.stringify(res));
  return { props: { album: album } };
}
