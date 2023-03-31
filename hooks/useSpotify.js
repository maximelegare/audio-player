import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { useRecoilState } from "recoil";
import { spotifyPlaylistsAtomState } from "../atoms/audioAtomSpotify";
import { spotifyCurrentPlaylistAtomState } from "../atoms/audioAtomSpotify";
import { spotifyCurrentPlaylistIdAtomState } from "../atoms/audioAtomSpotify";

function useSpotify() {
  // Create Spotify APi
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const { data: session, status } = useSession();

  const [spotifyPlaylists, setSpotifyPlaylists] = useRecoilState(
    spotifyPlaylistsAtomState
  );

  const [spotifyCurrentPlaylist, setSpotifyCurrentPlaylist] = useRecoilState(
    spotifyCurrentPlaylistAtomState
  );

  const [spotifyCurrentPlaylistId, setspotifyCurrentPlaylistId] =
    useRecoilState(spotifyCurrentPlaylistIdAtomState);

  useEffect(() => {
    if (session) {
      // If refresh access token attemps fails, direct user to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  // Get all the user's spotify playlists
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

  // Get specific spotify playlist
  const getSpotifyCurrentPlaylist = () => {
    spotifyApi
      ?.getPlaylist(spotifyCurrentPlaylistId)
      .then((data) => {
        setSpotifyCurrentPlaylist(data?.body);
      })
      .catch((err) => console.log(err));
  };

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

  const removeTrackFromPlaylistByPosition = (playlistId, idx, songId) => {
    spotifyApi
      .removeTracksFromPlaylistByPosition(
        "5ieJqeLJjjI8iJWaxeBLuK",
        [idx],
        "0wD+DKCUxiSR/WY8lF3fiCTb7Z8X4ifTUtqn8rO82O4Mvi5wsX8BsLj7IbIpLVM9"
      )
      .then(
        function (data) {
          console.log("Tracks removed from playlist!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  return {
    spotifyApi,
    spotifyPlaylists,
    spotifyCurrentPlaylist,
    getSpotifyCurrentPlaylist,
    addSongToSpotifyPlaylist,
  };
}

export default useSpotify;
