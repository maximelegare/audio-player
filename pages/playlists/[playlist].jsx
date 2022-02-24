import React from "react";
import { sql_select } from "../../lib/db";
import Header from "../../components/_Partials/Header";
import RowList from "../../components/_Partials/List/RowList/RowList";
import {useRouter} from "next/router";


const Playlist = ({ playlistSongs }) => {
  const {query} = useRouter()

  return (
    <div>
      <Header title={query.playlist} />
      <RowList data={playlistSongs} />
    </div>
  );
};

export default Playlist;

export async function getServerSideProps(context) {
  const { playlist } = context.query;
  const res = await sql_select(`
  SELECT s.title, s.title_route as song_route, s.duration,  s.album, s.track_no,
  a.picture_url, a.artist,
  s.streaming_url,
  p.title as playlist_title
  FROM songs s 
  JOIN song_playlist sp 
  ON s.title_route = sp.song_route 
  JOIN albums a 
  ON s.album = a.title 
  JOIN playlists p ON p.title = sp.playlist 
  WHERE p.route = '/playlists/${playlist}'`);

  const playlistSongs = JSON.parse(JSON.stringify(res));

  return {
    props: {
      playlistSongs,
    },
  };
}
