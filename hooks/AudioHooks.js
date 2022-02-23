import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  queueState,
  currentSongState,
  isPlayingState,
} from "../atoms/audioAtom";

import { useRouter } from "next/router";

const useAudioPlayer = (fileUrl, duration) => {
  // Global state
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [queue, setQueue] = useRecoilState(queueState);

  // Progress input vales
  const [progressInput, setRangeInput] = useState({
    values: [0],
    min: 0,
    step: 1,
  });

  const [max, setMax] = useState(100); // maximum time of the range input (duration of the song)

  // Dom references
  const animationRef = useRef(null); // Animation of the Range input

  const audioPlayer = useRef(null); // AudioPlayer which is in child component

  const { route } = useRouter();

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

    // call itself to always do the animation
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

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

  // Sets the next song when the previous song finished
  useEffect(() => {
    if (Math.round(audioPlayer?.current?.currentTime) === duration) {
      setCurrentSong({
        ...queue.songs[currentSong.songIdx + 1],
        songIdx: currentSong.songIdx + 1,
      });
    }
  }, [audioPlayer?.current?.currentTime, duration]);

  // Set the next or previous song
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

  // Set the current Song based & playlist based on the song clicked
  const setPlaylistAndSong = (songIdx, playlistSongs, title) => {
    setQueue({ songs: playlistSongs, title: title });

    setCurrentSong({ ...playlistSongs[songIdx], songIdx });
  };

  const addSongToLikedPlaylist = () => {};
  const addSongToPlaylist = () => {};
  const addSongToQueue = () => {};

  // when a user drag the knob, it updates the progress-bar
  const changeRange = (values) => {
    setRangeInput({ ...progressInput, values: [values] });
    audioPlayer.current.currentTime = values;
  };

  return {
    isPlaying,
    currentSong,
    progressInput,
    max,
    queue,
    audioPlayer,
    animationRef,
    setIsPlaying,
    setCurrentSong,
    changeRange,
    setNextSong,
    setPlaylistAndSong,
    addSongToLikedPlaylist,
    addSongToPlaylist,
    addSongToQueue,
  };
};

export { useAudioPlayer };
