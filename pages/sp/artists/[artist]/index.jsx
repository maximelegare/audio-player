import React from "react";
import Header from "../../../../components/_Partials/Header";
import PageLayout from "../../../../components/Layout/PageLayout";
import { getSession } from "next-auth/react";
import spotifyApi from "../../../../lib/spotify";
import { useEffect } from "react";
import RowList from "../../../../components/_Partials/List/RowList/RowList";
import GridList from "../../../../components/_Partials/List/GridList/GridList";
import TitleSection from "../../../../components/_Partials/Title/TitleSection";


const Index = ({ topTracks, albums }) => {
  return (
    <>
      <Header title={albums[0].artist} src={albums[0].picture_url} smallTitle="Spotify Artist" />
      <PageLayout>
        <RowList data={topTracks} topHeaderTitle="Popular" />
        <TitleSection title="Albums"/>
        <GridList data={albums} variant="bigCard"/>
      </PageLayout>
    </>
  );
};
export default Index;

export async function getServerSideProps(context) {
  const { artist } = context.query;
  //   console.log("artist", artist)
  const session = await getSession(context);

  spotifyApi.setAccessToken(session.user.accessToken);
  spotifyApi.setRefreshToken(session.user.refreshToken);

  let topTracksRes;
  let albumsRes;
  if (session) {
    topTracksRes = await spotifyApi.getArtistTopTracks(artist, "GB").then(
      function (data) {
        return data.body.tracks;
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    albumsRes = await spotifyApi.getArtistAlbums(artist).then(
      function (data) {
        return data.body.items;
      },
      function (err) {
        console.error(err);
      }
    );
  }

  const topTracks = topTracksRes?.map((track) => {
    return {
      id: track.id,
      picture_url: track.album.images[0].url,
      album: track.album.name,
      albumId: track.album.id,
      title: track.name,
      artist: track.artists[0].name,
      artistId: track.artists[0].id,
      duration: track.duration_ms / 1000,
      provider: "spotify",
      spotify: { ...track },
    };
  });

  const albums = albumsRes?.map((album) => {
    return {
      id: album.id,
      picture_url: album.images[0].url,
      artist: album.artists[0].name,
      album: album.name,
      route: `/sp/albums/${album.id}`,
      title: album.name,
      provider: "spotify",
      year: album.release_date.slice(0, 4),
      spotify: { ...album },
    };
  });

  

  const formatedTopTracks = JSON.parse(JSON.stringify(topTracks));
  const formatedAlbums = JSON.parse(JSON.stringify(albums));

  return {
    props: {
        
      topTracks: formatedTopTracks,
      albums:formatedAlbums,
    },
  };
}
