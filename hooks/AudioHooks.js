import { playlistRouteTypes as routeType } from "../lib/route_types/playlist.types";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  currentRouteSongsState,
  currentSongState,
  customPlaylistsState,
  isPlayingState,
  likedSongsPlaylistState,
  queueState,
  repeatState,
  randomState,
} from "../atoms/audioAtom";
import axios from "axios";
import { createUrlRoute } from "../lib/utilities";

const useAudioPlayer = (fileUrl, duration) => {
  // Global state for song
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

  // Queue state
  const [queue, setQueue] = useState([]);
  const [recoilQueue, setRecoilQueue] = useRecoilState(queueState);
  useEffect(() => {
    setQueue(recoilQueue);
  }, [recoilQueue]);

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

  // Set play/pause based on isPlaying value & when file changes
  useEffect(() => {
    if (isPlaying) {
      audioPlayer?.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying); // Start range input animation
    } else {
      audioPlayer?.current?.pause();
      cancelAnimationFrame(animationRef.current); // Stop range input animation
    }
  }, [isPlaying, fileUrl]);

  // Sets the next song Automatically when the previous song finished
  useEffect(() => {
    // If the current time equal duration (end of song)
    if (Math.round(audioPlayer?.current?.currentTime) === duration) {
      // Song is not on repeat
      if (repeatValue !== 2) {
        //If it's the last song
        if (currentSong.songIdx === queue.songs.length -1) {
          // Repeat playlist
          if (repeatValue === 1) {
            console.log(queue.songs[0])
            setCurrentSong({
              ...queue.songs[0],
              songIdx: 0,
            });
          }
          // Stop the player
          else{
            changeRange(0)
            setCurrentSong({})
            setIsPlaying(false)

          }
        } else {
          setCurrentSong({
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
      setCurrentSong({
        // Check the current song in the playlist based on it's index
        ...recoilQueue.songs[currentSong.songIdx - 1],
        songIdx: currentSong.songIdx - 1,
      });
    } else {
      setCurrentSong({
        ...recoilQueue.songs[currentSong.songIdx + 1],
        songIdx: currentSong.songIdx + 1,
      });
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

  // Set Random Option
  // Random button state (randomize order of songs)
  const [randomValue, setRandomValue] = useState(false);
  const [recoilRandomState, setRecoilRandomState] = useRecoilState(randomState);
  useEffect(() => {
    setRandomValue(recoilRandomState);
  }, [recoilRandomState]);

  const changeRandomValue = () => {
    setRecoilRandomState(!randomValue);
  };

  ///////////////////////////////////////////////////////////////////////////////////

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
      await axios.post("http://localhost:3000/api/playlist", {
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
    setRecoilQueue({ songs: playlistSongs, title: title });
    setCurrentSong({ ...playlistSongs[songIdx], songIdx });
  };

  // Send data to backend for it to create playlist in mysql
  const createPlaylist = async (name) => {
    const route = createUrlRoute(["playlists", name]);
    const playlist = {
      title: name,
      route: `/${route}`,
    };
    setRecoilPlaylists([...playlists, playlist]);

    try {
      await axios.post("http://localhost:3000/api/playlist", {
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
        await axios.post("http://localhost:3000/api/playlist", {
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
        await axios.post("http://localhost:3000/api/playlist", {
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
    addAndRemoveSongFromPlaylist,
    changeRandomValue,
    changeRange,
    changeRepeatValue,
    createPlaylist,
    setCurrentRouteSongs,
    setCurrentSong,
    setIsPlaying,
    setLikedSongsPlaylist,
    setNextSong,
    setPlaylistAndSong,
    setPlaylistsDataGlobally,
    toggleLikedSong,
    toggleSongFromQueue,
  };
};
export { useAudioPlayer };
