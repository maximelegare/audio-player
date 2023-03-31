import React from "react";
import Header from "../../../components/_Partials/Header";
import PageLayout from "../../../components/Layout/PageLayout";
import RowList from "../../../components/_Partials/List/RowList/RowList";
import { getSession } from "next-auth/react";
import spotifyApi from "../../../lib/spotify";
import { useEffect } from "react";

const Index = ({ likedSongs }) => {
  return (
    <>
      <Header title="Spotify Liked Songs" variant="small" />
      <PageLayout>
        <RowList data={likedSongs} />
      </PageLayout>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  spotifyApi.setAccessToken(session.user.accessToken);
  spotifyApi.setRefreshToken(session.user.refreshToken);

  let savedTracks;

  if (session) {
    savedTracks = await spotifyApi
      .getMySavedTracks()
      .then(
        function (data) {
          return data.body.items
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }
  const likedSongs = savedTracks.map(({track}) => {
    return {
      id: track.id,
      picture_url: track.album.images[0].url,
      artist: track.artists[0].name,
      artistId: track.artists[0].id,
      route: `/sp/songs/${track.id}`,
      year: track.album.release_date.slice(0, 4),
      title: track.name,
      album: track.album.name,
      albumId: track.album.id,
      duration: track.duration_ms / 1000,
      provider:"spotify",
      spotify: { ...track },
    };
    // id:item.track.id,
    //   title: item.track.name,
    //   artist: item.track.artists[0].name,
    //   picture_url: item.track.album.images[0].url,
    //   album: item.track.album.name,
    //   duration: item.track.duration_ms / 1000,
    //   ...item,
});

  const formatedTopTracks = JSON.parse(JSON.stringify(likedSongs));
  return {
    props: {
      likedSongs: formatedTopTracks,
    },
  };
}
