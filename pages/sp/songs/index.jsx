import React from "react";
import Header from "../../../components/_Partials/Header";
import PageLayout from "../../../components/Layout/PageLayout";
import RowList from "../../../components/_Partials/List/RowList/RowList";
import { getSession } from "next-auth/react";
import spotifyApi from "../../../lib/spotify";
import { useEffect } from "react";

const Index = ({ topTracks }) => {
  

  return (
    <>
      <Header
        title="Spotify Songs"
        variant="small"
/>
      <PageLayout>
        <RowList 
        topHeaderTitle="Most listened"
        data={topTracks} 
        />
      </PageLayout>
    </>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  spotifyApi.setAccessToken(session.user.accessToken);
  spotifyApi.setRefreshToken(session.user.refreshToken);

  let topTracksRes;

  if (session) {
    topTracksRes = await spotifyApi.getMyTopTracks().then(
      function (data) {
        return data.body.items;
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }


  const topTracks = topTracksRes.map((song) => {
    return {
      id: song.id,
      picture_url: song.album.images[0].url,
      artist: song.artists[0].name,
      route: `/sp/songs/${song.id}`,
      year: song.album.release_date.slice(0, 4),
      title: song.name,
      album:song.album.name,
      duration:song.duration_ms / 1000,
      provider:"spotify",
      spotify:{...song}
    };
    // id:item.track.id,
    //   title: item.track.name,
    //   artist: item.track.artists[0].name,
    //   picture_url: item.track.album.images[0].url,
    //   album: item.track.album.name,
    //   duration: item.track.duration_ms / 1000,
    //   ...item,
  });
  console.log("topTracks", topTracks)
  const formatedTopTracks = JSON.parse(JSON.stringify(topTracks));
  return {
    props: {
      topTracks: formatedTopTracks,
    },
  };
}
