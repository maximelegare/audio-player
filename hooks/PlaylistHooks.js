import axios from "axios";
import { customPlaylistsState } from "../atoms/audioAtom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

const usePlaylists = () => {
  const [recoilPlaylists, setRecoilPlaylists] = useRecoilState(customPlaylistsState);
   // Use useState & useEffect to make sure the data is there, otherwise there's an error
   const [playlists, setPlaylists] = useState(null);
 

   useEffect(() => {
     setPlaylists(recoilPlaylists);
   }, [recoilPlaylists]);



  const createPlaylist = async (name) => {
    try {
      await axios.post("http://localhost:3000/api/create-playlist", { name });
    } catch (err) {
      console.log(err);
    }
  };

  // Sets playlists to local storage
  const setPlaylistsDataGlobally = (data) => {
    setRecoilPlaylists(data);
  };

  return {
    playlists,
    createPlaylist,
    setPlaylistsDataGlobally,
  };
};

export {usePlaylists};
