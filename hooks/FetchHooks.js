import { useAudioPlayer } from "./AudioHooks";

const useFetch = () => {
  const { setPlaylistsDataGlobally } = useAudioPlayer();

  const fetchPlaylists = async (url) => {
    try {
      const res = await fetch(url);
      const { playlists } = await res.json();
      
      setPlaylistsDataGlobally(playlists);

      return;
    } catch (err) {
      return { message: err.message };
    }
  };

  return {
    fetchPlaylists,
  };
};

export default useFetch;
