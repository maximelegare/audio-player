import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { useRecoilState } from "recoil";
import { spotifyPlaylistsAtomState } from "../atoms/audioAtomSpotify";
import { spotifyCurrentPlaylistAtomState } from "../atoms/audioAtomSpotify";
import { useAudioPlayer } from "./AudioHooks";

function useSpotify() {
  // Create Spotify APi
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const { currentRouteSongs, setCurrentRouteSongs } = useAudioPlayer();

  const { data: session, status } = useSession();

  const [spotifyPlaylists, setSpotifyPlaylists] = useRecoilState(
    spotifyPlaylistsAtomState
  );

  const [spotifyCurrentPlaylist, setSpotifyCurrentPlaylist] = useRecoilState(
    spotifyCurrentPlaylistAtomState
  );

  useEffect(() => {
    if (session) {
      // If refresh access token attemps fails, direct user to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  ///////////////
  // Playlists //
  ///////////////

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      return spotifyApi.getUserPlaylists().then((data) => {
        const formatedItems = data?.body.items.map((item) => {
          let isUserPlaylist = false;
          if (session?.user.userId === item.owner.id) {
            isUserPlaylist = true;
          }

          return {
            ...item,
            isUserPlaylist,
          };
        });
        setSpotifyPlaylists(formatedItems);
      });
    }
  }, [session, spotifyApi]);

  // Add track to spotify playlist
  const addSongToSpotifyPlaylist = (playlistId, tracksUris) => {
    spotifyApi.setAccessToken(session.user.accessToken);
    spotifyApi.addTracksToPlaylist(playlistId, tracksUris).then(
      function (data) {
        return console.log("Added tracks to playlist!");
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  // Remove track from playlist
  const removeTrackFromPlaylistByPosition = (
    playlistId,
    songId,
    idx,
    snapshotId
  ) => {
    const filteredSongs = currentRouteSongs.filter(
      (song) => songId !== song.id
    );
    setCurrentRouteSongs(filteredSongs);
    spotifyApi.setAccessToken(session.user.accessToken);
    spotifyApi
      .removeTracksFromPlaylistByPosition(playlistId, [idx], snapshotId)
      .then(
        function (data) {
          console.log("Tracks removed from playlist!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  const createSpotifyPlaylist = (title, description = "") => {
    spotifyApi.setAccessToken(session.user.accessToken);
    spotifyApi
      .createPlaylist(title, {
        description: description,
        public: true,
      })
      .then(
        function ({ body }) {
          setSpotifyPlaylists([
            { ...body, isUserPlaylist: true },
            ...spotifyPlaylists,
          ]);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  return {
    spotifyApi,
    spotifyPlaylists,
    addSongToSpotifyPlaylist,
    createSpotifyPlaylist,
    removeTrackFromPlaylistByPosition,
  };
}

export default useSpotify;
