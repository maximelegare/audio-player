import React, { useEffect } from "react";
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
  const res = await sql_select(`
    SELECT DISTINCT (a.title), s.duration, s.title, s.album, s.title_route as song_route, a.title_route as album_route, s.streaming_url, a.artist_route, a.picture_url, a.artist
    FROM songs s
    JOIN albums a 
    ON a.title = s.album
    `);
  const songs = JSON.parse(JSON.stringify(res));

  return { props: { songs,  } };
}
