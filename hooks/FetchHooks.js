import usePlaylists from "./PlaylistHooks";
const useFetch = () => {
  const { setPlaylistsDataGlobally } = usePlaylists();

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
