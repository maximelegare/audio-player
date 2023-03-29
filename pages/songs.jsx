import React, { useEffect } from "react";
import Header from "../components/_Partials/Header";
import RowList from "../components/_Partials/List/RowList/RowList";
import PageLayout from "../components/Layout/PageLayout";

import { sql_query_string } from "../lib/db";

const songs = ({ songs }) => {
  return (
    <div>
      <Header title="Hodei Songs" />
      <PageLayout>
        <RowList data={songs} />
      </PageLayout>
    </div>
  );
};

export default songs;

export async function getServerSideProps(context) {
  const res = await sql_query_string(`
    SELECT DISTINCT (a.title), s.duration, s.liked, s.id, s.title, s.album, s.title_route as song_route, a.title_route as album_route, s.streaming_url, s.RP_streaming_path, a.artist_route, a.picture_url, a.artist, 'hodei' as provider
    FROM songs s
    JOIN albums a 
    ON a.title = s.album
    `);
  const songs = JSON.parse(JSON.stringify(res));

  return { props: { songs } };
}
