import React, {useEffect, useState} from "react";
import { sql_query_string } from "../../lib/db";
import Header from "../../components/_Partials/Header";
import RowList from "../../components/_Partials/List/RowList/RowList";
import { useAudioPlayer } from "../../hooks/AudioHooks";

const Playlist = ({ playlistSongs }) => {
  const { currentRouteSongs, setCurrentRouteSongs } = useAudioPlayer()
  
  useEffect(() => {
    setCurrentRouteSongs(playlistSongs)    
  }, [playlistSongs])
  
 
  return (
    <div>
      <Header title={playlistSongs[0]?.playlist_title} />
      <RowList data={currentRouteSongs}/>
    </div>
  );
};

export default Playlist;

export async function getServerSideProps(context) {
  const { playlist } = context.query;
  const res = await sql_query_string(`
  SELECT s.title, s.title_route as song_route, s.duration,  s.album, s.track_no,
  a.picture_url, a.artist,
  s.streaming_url,
  s.liked,
  p.title as playlist_title,
  a.title_route as album_route,
  a.artist_route
  FROM songs s 
  JOIN song_playlist sp 
  ON s.title_route = sp.song_route 
  JOIN albums a 
  ON s.album = a.title 
  JOIN playlists p ON p.title = sp.playlist 
  WHERE p.route = '/playlists/${playlist}'
  ORDER BY sp.id
  `);

  const playlistSongs = JSON.parse(JSON.stringify(res));

  return {
    props: {
      playlistSongs,
    },
  };
}
