import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

import { useRecoilState } from "recoil";
import { spotifyPlaylistsAtomState } from "../atoms/audioAtomSpotify";

function useSpotify() {
  const [spotifyPlaylists, setSpotifyPlaylists] = useRecoilState(
    spotifyPlaylistsAtomState
  );

  // Create Spotify APi
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attemps fails, direct user to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      return spotifyApi.getUserPlaylists().then((data) => {
        setSpotifyPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return { spotifyApi, spotifyPlaylists };
}

export default useSpotify;
