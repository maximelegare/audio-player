import axios from "axios"
import { customPlaylistsState } from "../atoms/audioAtom"
import { useSetRecoilState } from "recoil"


const usePlaylists = () => {
    const setPlaylists = useSetRecoilState(customPlaylistsState)



  const createPlaylist = async (name) => {
      try{
         await axios.post("http://localhost:3000/api/create-playlist", {name})   
      }catch(err){
          console.log(err)
      }
  }  

  // Sets playlists to local storage 
  const setPlaylistsDataGlobally = (data) => {
    setPlaylists(data)
  }

  return {
    createPlaylist,
    setPlaylistsDataGlobally
  }
}

export default usePlaylists