import React, { useEffect, useState } from "react";
import Header from "../../../components/_Partials/Header";
import RowList from "../../../components/_Partials/List/RowList/RowList";

import { getSession } from "next-auth/react";

import useSpotify from "../../../hooks/useSpotify";
import { useRouter } from "next/router";
import fallbackImage from "../../../public/assets/SVG/musicNote.svg";
import PageLayout from "../../../components/Layout/PageLayout";
import spotifyApi from "../../../lib/spotify";

const Playlist = ({ playlistTitle, playlistImages, playlist }) => {
  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  return (
    <div>
      <Header
        src={fallbackImage}
        images={playlistImages}
        title={playlistTitle}
        smallTitle="Spotify Playlist"
      />
      <PageLayout>
        <RowList data={playlist} />
      </PageLayout>
    </div>
  );
};

export default Playlist;

export async function getServerSideProps(context) {
  const { playlist: playlistId } = context.params;
  const session = await getSession(context);

  spotifyApi.setAccessToken(session.user.accessToken);
  spotifyApi.setRefreshToken(session.user.refreshToken);
  let res;

  if (session) {
    res = await spotifyApi.getPlaylist(playlistId).then((data) => {
      console.log(data.body);
      return {
        tracks: data.body.tracks.items,
        playlistTitle: data.body.name,
      };
    });
  }
  const playlistImagesSet = new Set();

  const formatedPlaylist = res.tracks.map((item) => {
    playlistImagesSet.add(item.track.album.images[0].url);
    return {
      id:item.track.id,
      title: item.track.name,
      artist: item.track.artists[0].name,
      picture_url: item.track.album.images[0].url,
      album: item.track.album.name,
      duration: item.track.duration_ms,
      ...item,
    };

  });
  const playlistImagesArray = Array.from(playlistImagesSet).slice(0, 4);
  const playlist = JSON.parse(JSON.stringify(formatedPlaylist));
  return {
    props: {
      playlist: playlist,
      playlistImages: playlistImagesArray,
      playlistTitle: res.playlistTitle,
    },
  };
  // return {props:{}}
}

// Get specific spotify playlist
