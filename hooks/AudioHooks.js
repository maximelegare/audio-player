import { playlistRouteTypes as type } from "../lib/route_types/playlist.types";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  queueState,
  currentSongState,
  isPlayingState,
  customPlaylistsState,
} from "../atoms/audioAtom";
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";

const useAudioPlayer = (fileUrl, duration) => {
  // Global state
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [queue, setQueue] = useRecoilState(queueState);

  // Playlists state
  const [recoilPlaylists, setRecoilPlaylists] =
    useRecoilState(customPlaylistsState);

  const [playlists, setPlaylists] = useState(null);

  const [progressInput, setRangeInput] = useState({
    values: [0],
    min: 0,
    step: 1,
  }); // Progress input values

  const [max, setMax] = useState(100); // maximum time of the range input (duration of the song)

  // Dom references
  const animationRef = useRef(null); // Animation of the Range input

  const audioPlayer = useRef(null); // AudioPlayer which is in child component

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
    if (Math.round(audioPlayer?.current?.currentTime) === duration) {
      setCurrentSong({
        ...queue.songs[currentSong.songIdx + 1],
        songIdx: currentSong.songIdx + 1,
      });
    }
  }, [audioPlayer?.current?.currentTime, duration]);

  // Set the next or previous song when button cliked
  const setNextSong = (status) => {
    if (status === "previous") {
      setCurrentSong({
        // Check the current song in the playlist based on it's index
        ...queue.songs[currentSong.songIdx - 1],
        songIdx: currentSong.songIdx - 1,
      });
    } else {
      setCurrentSong({
        ...queue.songs[currentSong.songIdx + 1],
        songIdx: currentSong.songIdx + 1,
      });
    }
  };

  const toggleLikedSong = async (songRoute, liked) => {
    try {
      await axios.post("http://localhost:3000/api/playlist", {
        type: type.TOGGLE_LIKED_SONG,
        liked: !liked,
        songRoute,
      });
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////

  ///////////////
  // PLAYLISTS //
  ///////////////

  const toggleSongFromQueue = (song, route) => {

    // If the route is /queue => remove from queue with filter
    if (route === "/queue") {
      const newQueue = queue.songs.filter(
        (listSong) => song.song_route !== listSong.song_route
      );
      setQueue({ ...queue, songs: newQueue });

      // Otherwise Add to queue
    } else {

      // Check if duplicate
      const duplicateSong = queue.songs.filter(
        (listSong) => song.song_route === listSong.song_route
      );
      if (duplicateSong[0]) {
        return;
      } else {
        setQueue({ ...queue, songs: [...queue.songs, song] });
      }
    }
  };

  // Set the current Song based & playlist based on the song clicked
  const setPlaylistAndSong = (songIdx, playlistSongs, title) => {
    setQueue({ songs: playlistSongs, title: title });

    setCurrentSong({ ...playlistSongs[songIdx], songIdx });
  };

  // Set the local state the same as recoil state when loaded
  useEffect(() => {
    setPlaylists(recoilPlaylists);
  }, [recoilPlaylists]);

  // Send data to backend for it to create playlist in mysql
  const createPlaylist = async (name) => {
    try {
      await axios.post("http://localhost:3000/api/playlist", {
        type: type.CREATE_PLAYLIST,
        name,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Add song to specific playlist
  const addSongToPlaylist = async (song, playlistName) => {
    try {
      // setPlaylists([...playlists, song])
      // await axios.post("http://localhost:3000/api/playlist", {
      //   type: type.ADD_SONG_TO_PLAYLIST,
      //   songRoute:song.song_route,
      //   playlistName,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  // Sets playlists to local storage
  const setPlaylistsDataGlobally = (data) => {
    setRecoilPlaylists(data);
  };

  return {
    isPlaying,
    currentSong,
    progressInput,
    max,
    queue,
    audioPlayer,
    animationRef,
    playlists,
    setIsPlaying,
    setCurrentSong,
    changeRange,
    setNextSong,
    setPlaylistAndSong,
    toggleLikedSong,
    addSongToPlaylist,
    toggleSongFromQueue,
    createPlaylist,
    setPlaylistsDataGlobally,
  };
};
export { useAudioPlayer };
