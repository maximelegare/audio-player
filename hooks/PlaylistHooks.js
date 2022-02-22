import axios from "axios"

const usePlaylists = () => {
  
  const createPlaylist = async (name) => {
      try{
         await axios.post("http://localhost:3000/api/create-playlist", {name})   
      }catch(err){
          console.log(err)
      }
  }  


  return {
    createPlaylist
  }
}

export default usePlaylists