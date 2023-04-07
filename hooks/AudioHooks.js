import { playlistRouteTypes as routeType } from "../lib/route_types/playlist.types";
import { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentRouteSongsState,
  currentSongState,
  customPlaylistsState,
  isPlayingState,
  likedSongsPlaylistState,
  queueState,
  repeatState,
  randomState,
  randomQueueState,
} from "../atoms/audioAtom";
import { spotifyDeviceIdAtom } from "../atoms/audioAtomSpotify";

import axios from "axios";
import { createUrlRoute } from "../lib/utilities";

import { spotifyIsPlayingAtom } from "../atoms/audioAtomSpotify";
import spotifyApi from "../lib/spotify";
import { useSession } from "next-auth/react";
import { shuffleArray } from "../lib/utilities";
const useAudioPlayer = (fileUrl, duration) => {
  const { data: session } = useSession();
  const spotifyDeviceId = useRecoilValue(spotifyDeviceIdAtom);

  // Global state for song
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState); //hodei playing state
  const [spotifyIsPlaying, setSpotifyIsPlaying] =
    useRecoilState(spotifyIsPlayingAtom); // Spotify playing state

  const [currentSong, setCurrentSong] = useState({});
  const [recoilCurrentSong, setRecoilCurrentSong] =
    useRecoilState(currentSongState);
  useEffect(() => {
    setCurrentSong(recoilCurrentSong);
  }, [recoilCurrentSong]);

  // Queue state
  const [queue, setQueue] = useState([]);
  const [recoilQueue, setRecoilQueue] = useRecoilState(queueState);
  useEffect(() => {
    setQueue(recoilQueue);
  }, [recoilQueue]);

  const [randomQueue, setRandomQueue] = useState([]);
  const [recoilRandomQueue, setRecoilRandomQueue] =
    useRecoilState(randomQueueState);
  useEffect(() => {
    setRandomQueue(recoilRandomQueue);
  }, [recoilRandomQueue]);

  // Progress input state
  const [progressInput, setRangeInput] = useState({
    values: [0],
    min: 0,
    step: 1,
  }); // Progress input values

  const [max, setMax] = useState(100); // maximum time of the range input (duration of the song)

  // Dom references
  const animationRef = useRef(null); // Animation of the Range input

  const audioPlayer = useRef(null); // AudioPlayer which is in child component

  // Repeat Button State
  const [repeatValue, setRepeatValue] = useState(null);
  const [recoilRepeatState, setRecoilRepeatState] = useRecoilState(repeatState);
  useEffect(() => {
    setRepeatValue(recoilRepeatState);
  }, [recoilRepeatState]);

  // set the max duration when metadata are loaded
  useEffect(() => {
    const seconds = Math.floor(duration);
    setMax(seconds);
  }, [audioPlayer?.current?.loadedmetadata, duration]);

  // animation that updates the range while it's playing
  const whilePlaying = () => {
    setRangeInput({
      ...progressInput,
      values: [audioPlayer?.current?.currentTime],
    });

    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  // when a user drag the knob, it updates the progress-bar
  const changeRange = (values) => {
    setRangeInput({ ...progressInput, values: [values] });
    audioPlayer.current.currentTime = values;
  };

  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////
  //   SONGS   //
  ///////////////

  // Is playing dispatcher
  const setPlayingStateDispatcher = (provider, status, value) => {
    switch (provider) {
      case "hodei": {
        if (status === "play" || (!status && isPlaying)) {
          setIsPlaying(value? value: true);
          hPlay();
        } else {
          setIsPlaying(value? value: false);
          hPause();
        }
        break;
      }
      case "spotify": {
        if (status === "play" || (!status && spotifyIsPlaying)) {
          setSpotifyIsPlaying(value? value: true);
          // sPlay(currentSong.uri);
        } else {
          setSpotifyIsPlaying(value? value: false);
          // sPause();
        }
        break;
      }
    }
  };

  // hodei play pause functions
  const hPlay = () => {
    audioPlayer?.current?.play();
    // animationRef.current = requestAnimationFrame(whilePlaying); // Start range input animation
  };

  const hPause = () => {
    audioPlayer?.current?.pause();
    // cancelAnimationFrame(animationRef.current);
  };

  // Spotify play pause functions
  const sPlay = (songUri) => {
    spotifyApi.setAccessToken(session?.user.accessToken);

    if (session?.user.accessToken) {
      // spotifyApi.transferMyPlayback({device_ids:["2349e17ca5694253687aa0bead5ee4303209dff5"], play:true})

      spotifyApi.play({ uris: [songUri] }).then(
        function () {
          console.log("Playback started");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
    // animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const sPause = () => {
    spotifyApi.setAccessToken(session?.user.accessToken);
    if (session?.user.accessToken) {
      spotifyApi.pause().then(
        function () {
          console.log("Playback paused");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
    // cancelAnimationFrame(animationRef.current); // Stop range input animation
  };

  // Set play/pause based on isPlaying value & when file changes
  useEffect(() => {
    // if (isPlaying) {
    //   animationRef.current = requestAnimationFrame(whilePlaying); // Start range input animation
    // } else {
    //   cancelAnimationFrame(animationRef.current); // Stop range input animation
    // }
    setPlayingStateDispatcher(currentSong?.provider);
  }, [isPlaying, fileUrl]);

  // Sets the next song Automatically when the previous song finished
  useEffect(() => {
    // If the current time equal duration (end of song)
    if (Math.round(audioPlayer?.current?.currentTime) === duration) {
      // Song is not on repeat
      if (repeatValue !== 2) {
        //If it's the last song
        if (currentSong.songIdx === queue.songs.length - 1) {
          // Repeat playlist
          if (repeatValue === 1) {
            setRecoilCurrentSong({
              ...queue.songs[0],
              songIdx: 0,
            });
          }
          // Stop the player
          else {
            setIsPlaying(false);
            setRecoilCurrentSong({});
            changeRange(0);
          }
          // It's not the last song
        } else {
          setRecoilCurrentSong({
            ...recoilQueue.songs[currentSong.songIdx + 1],
            songIdx: currentSong.songIdx + 1,
          });
        }
        // Repeat song
      } else {
        changeRange(0);
      }
    }
  }, [audioPlayer?.current?.currentTime, duration, repeatValue]);
  // Set the next or previous song when button cliked
  const setNextSong = (status) => {
    if (status === "previous") {
      // If it's the first song
      if (currentSong.songIdx === 0) {
        setRecoilCurrentSong({
          ...queue.songs[0],
          songIdx: 0,
        });
        changeRange(0);
      } else {
        setIsPlaying(true);
        setRecoilCurrentSong({
          // Check the current song in the playlist based on it's index
          ...recoilQueue.songs[currentSong.songIdx - 1],
          songIdx: currentSong.songIdx - 1,
        });
      }
    } else {
      // If it's the last song
      if (currentSong.songIdx === queue.songs.length - 1) {
        setRecoilCurrentSong({
          ...queue.songs[0],
          songIdx: 0,
        });
      } else {
        setIsPlaying(true);
        setRecoilCurrentSong({
          ...recoilQueue.songs[currentSong.songIdx + 1],
          songIdx: currentSong.songIdx + 1,
        });
      }
    }
  };

  // Change Repeat state based on the number received
  const changeRepeatValue = (number) => {
    if (number >= 2) {
      setRecoilRepeatState(0);
    } else {
      setRecoilRepeatState(number + 1);
    }
  };

  // Set Random Option Button
  // Random button state (randomize order of songs)
  const [randomValue, setRandomValue] = useState(false);
  const [recoilRandomState, setRecoilRandomState] = useRecoilState(randomState);
  useEffect(() => {
    setRandomValue(recoilRandomState);
  }, [recoilRandomState]);

  const changeRandomValue = () => {
    setRecoilRandomState(!randomValue);
  };

  //###############################################################################//
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////////////
  ////SPOTIFY PLAYING////
  ///////////////////////

  ///////////////
  // PLAYLISTS //
  ///////////////

  // Liked songs playlist data
  // Update in real time the liked songs
  const [likedSongsPlaylist, setLikedSongsPlaylist] = useRecoilState(
    likedSongsPlaylistState
  );

  // Playlist displayed on the current route (the songs)
  // To update in real time songs in playlist
  const [currentRouteSongs, setCurrentRouteSongs] = useRecoilState(
    currentRouteSongsState
  );

  // Playlists state (in Sidebar)
  // Use local state to prevent problemes with persistance
  const [playlists, setPlaylists] = useState(null);
  const [recoilPlaylists, setRecoilPlaylists] =
    useRecoilState(customPlaylistsState);

  // Set the local state the same as recoil state when loaded
  useEffect(() => {
    setPlaylists(recoilPlaylists);
  }, [recoilPlaylists]);

  // Remove song from locally
  const filterSongFromPlaylist = (song, playlist) => {
    const newFilteredPlaylist = playlist.filter(
      (listSong) => song.song_route !== listSong.song_route
    );
    return newFilteredPlaylist;
  };

  // Toggle song from Liked playlist
  const toggleLikedSong = async (song) => {
    const newPaylist = filterSongFromPlaylist(song, likedSongsPlaylist); // Locally
    setLikedSongsPlaylist(newPaylist);
    try {
      await axios.post("/api/playlist", {
        type: routeType.TOGGLE_LIKED_SONG,
        liked: !song.liked,
        songRoute: song.song_route,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Add or delete songs from the queue
  const toggleSongFromQueue = (song, route) => {
    // If the route is /queue => remove from queue with filter

    if (route === "/queue") {
      const newFilteredQueue = filterSongFromPlaylist(song, recoilQueue.songs);

      setRecoilQueue({ ...recoilQueue, songs: newFilteredQueue });

      // Otherwise Add to queue
    } else {
      // Check if duplicate
      const duplicateSong = recoilQueue.songs.filter(
        (listSong) => song.song_route === listSong.song_route
      );
      if (duplicateSong[0]) {
        return;
      } else {
        setRecoilQueue({ ...recoilQueue, songs: [...recoilQueue.songs, song] });
      }
    }
  };

  // Set the current Song & playlist based on the song clicked
  const setPlaylistAndSong = (songIdx, playlistSongs, title) => {
    setRecoilQueue({ songs: playlistSongs, title });

    // Shuffled Array for random queue
    // const shuffledPlaylistSongs = shuffleArray(playlistSongs);
    // setRecoilRandomQueue({ songs: shuffledPlaylistSongs, title });

    setRecoilCurrentSong({ ...playlistSongs[songIdx], songIdx });
  };

  // Send data to backend for it to create playlist in mysql
  const createPlaylist = async (name) => {
    const route = createUrlRoute(["playlists", name]);
    const playlist = {
      title: name,
      route: `/${route}`,
    };
    setRecoilPlaylists([playlist, ...playlists]);

    try {
      await axios.post("/api/playlist", {
        type: routeType.CREATE_PLAYLIST,
        name,
        route,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addAndRemoveSongFromPlaylist = async (type, song, playlistName) => {
    // Add song to specific playlist if type add
    if (type === "add") {
      // Add Locally
      // setCurrentRouteSongs([...currentRouteSongs, song])

      try {
        // Set db
        await axios.post("/api/playlist", {
          type: routeType.ADD_SONG_TO_PLAYLIST,
          songRoute: song.song_route,
          playlistName,
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Otherwise remove from specific playlist
    else {
      // Remove Locally
      const newPlaylist = filterSongFromPlaylist(song, currentRouteSongs);
      setCurrentRouteSongs(newPlaylist);
      // Set db
      try {
        await axios.post("/api/playlist", {
          type: routeType.REMOVE_SONG_FROM_PLAYLIST,
          songRoute: song.song_route,
          playlistName,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  // Sets playlists to local storage
  const setPlaylistsDataGlobally = (data) => {
    setRecoilPlaylists(data);
  };

  return {
    animationRef,
    audioPlayer,
    currentRouteSongs,
    currentSong,
    isPlaying,
    likedSongsPlaylist,
    max,
    playlists,
    progressInput,
    queue,
    randomValue,
    repeatValue,
    spotifyIsPlaying,
    addAndRemoveSongFromPlaylist,
    changeRandomValue,
    changeRange,
    sPause,
    sPlay,
    hPause,
    hPlay,
    setPlayingStateDispatcher,
    changeRepeatValue,
    createPlaylist,
    setCurrentRouteSongs,
    setIsPlaying,
    setLikedSongsPlaylist,
    setNextSong,
    setPlaylistAndSong,
    setPlaylistsDataGlobally,
    setSpotifyIsPlaying,
    toggleLikedSong,
    toggleSongFromQueue,
  };
};
export { useAudioPlayer };
