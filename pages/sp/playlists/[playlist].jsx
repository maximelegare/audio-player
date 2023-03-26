import React, { useEffect, useState } from "react";
import Header from "../../../components/_Partials/Header";
import RowList from "../../../components/_Partials/List/RowList/RowList";

import useSpotify from "../../../hooks/useSpotify";
import { useRouter } from "next/router";
import fallbackImage from "../../../public/assets/SVG/musicNote.svg";
import PageLayout from "../../../components/Layout/PageLayout";
const Playlist = ({ playlistSongs, playlistTitle, playlistImages }) => {
  const { spotifyCurrentPlaylist, getSpotifyCurrentPlaylist } = useSpotify();
  const router = useRouter();
  const { playlist } = router.query

    useEffect(() => {
        getSpotifyCurrentPlaylist(playlist)
    }, [playlist])


  return (
    <div>
      {/* <Header
        src={fallbackImage}
        images={playlistImages.slice(0, 4)}
        title={playlistTitle[0]?.title}
        smallTitle="Playlist"
      />
      <PageLayout>
        <RowList data={spotifyCurrentPlaylist} />
      </PageLayout> */}
    </div>
  );
};

export default Playlist;

// export async function getServerSideProps({ params }) {
  // const songRoute = `/${params.artist}/${params.album}/${params.song}`;
  // const res = await sql_query_string(`
  // SELECT s.title, s.title_route as song_route, s.liked,  s.album, s.track_no, s.streaming_url, s.RP_streaming_path, a.picture_url, a.artist, s.duration, a.title_route as album_route, a.artist_route
  // FROM songs s
  // JOIN albums a
  // ON s.album = a.title
  // WHERE s.title_route = ?
  // `, [`${songRoute}`]);
  // const song = JSON.parse(JSON.stringify(res));
  // return { props: { song: song } };
// }

// Get specific spotify playlist
