import React, { useEffect, useState } from "react";
import { sql_query_string } from "../../lib/db";
import Header from "../../components/_Partials/Header";
import RowList from "../../components/_Partials/List/RowList/RowList";
import { useAudioPlayer } from "../../hooks/AudioHooks";

import fallbackImage from "../../public/assets/SVG/musicNote.svg";
import PageLayout from "../../components/Layout/PageLayout";
const Playlist = ({ playlistSongs, playlistTitle, playlistImages }) => {
  const { currentRouteSongs, setCurrentRouteSongs } = useAudioPlayer();

  

  useEffect(() => {
    setCurrentRouteSongs(playlistSongs);
  }, [playlistSongs]);

  return (
    <div>
      <Header
        src={fallbackImage}
        images={playlistImages.slice(0, 4)}
        title={playlistTitle[0]?.title}
        smallTitle="Playlist"
      />
      <PageLayout>
        <RowList data={currentRouteSongs} />
      </PageLayout>
    </div>
  );
};

export default Playlist;

export async function getServerSideProps(context) {
  const { playlist } = context.query;

  const titleRes = await sql_query_string(`
  SELECT title
  FROM playlists
  WHERE route = '/playlists/${playlist}'
  `);

  const songsRes = await sql_query_string(`
  SELECT s.title, s.title_route as song_route, s.duration,  s.album, s.track_no,
  a.picture_url, a.artist,
  s.streaming_url,
  s.RP_streaming_path,
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
  WHERE p.route = ?
  ORDER BY sp.id
  `,[`/playlists/${playlist}`]);

  const imagesRes = await sql_query_string(`
  SELECT DISTINCT
  a.picture_url
  FROM songs s 
  JOIN song_playlist sp 
  ON s.title_route = sp.song_route 
  JOIN albums a 
  ON s.album = a.title 
  JOIN playlists p ON p.title = sp.playlist 
  WHERE p.route = ? 
  `,[`/playlists/${playlist}`])

  const playlistSongs = JSON.parse(JSON.stringify(songsRes));
  const playlistTitle = JSON.parse(JSON.stringify(titleRes));
  const playlistImages = JSON.parse(JSON.stringify(imagesRes));

  return {
    props: {
      playlistSongs,
      playlistTitle,
      playlistImages
    },
  };
}
