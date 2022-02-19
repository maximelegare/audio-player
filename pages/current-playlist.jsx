import React from 'react'

import RowList from "../components/_Partials/List/RowList/RowList"
import Header from '../components/_Partials/Header'

import { useAudioPlayer } from '../hooks/AudioHooks' 

const CurrentPlaylist = () => {

  const { currentPlaylist } = useAudioPlayer()  

  return (
    <div>
        <Header title="Current Playlist"/>
        <RowList data={currentPlaylist}/>
    </div>
  )
}




export default CurrentPlaylist