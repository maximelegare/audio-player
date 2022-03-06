import React, { useEffect } from "react";

import { sql_query_string } from "../../../lib/db";

import Header from "../../../components/_Partials/Header";
import RowList from "../../../components/_Partials/List/RowList/RowList";

import PageLayout from "../../../components/Layout/PageLayout";

const Song = ({ song }) => {



  return (
    <>
      <Header
        title={song[0]?.album}
        src={song[0]?.picture_url}
        smallTitle={song[0]?.artist}
      />
      <PageLayout>
        <RowList data={song} />
      </PageLayout>
    </>
  );
};

export default Song;

export async function getServerSideProps({ params }) {
  const songRoute = `/${params.artist}/${params.album}/${params.song}`;
  const res = await sql_query_string(`
  SELECT s.title, s.title_route as song_route, s.liked,  s.album, s.track_no, s.streaming_url, a.picture_url, a.artist, s.duration, a.title_route as album_route, a.artist_route 
  FROM songs s
  JOIN albums a
  ON s.album = a.title 
  WHERE s.title_route = '${songRoute}' 
  `);
    
  const song = JSON.parse(JSON.stringify(res));
  return { props: { song: song } };
}
