import React from 'react'

import RowList from "../components/_Partials/List/RowList/RowList"
import Header from '../components/_Partials/Header'

import { useAudioPlayer } from '../hooks/AudioHooks' 

function Queue() {


  const { queue } = useAudioPlayer()  

  return (
    <div>
        <Header title="Queue"/>
        <RowList data={queue.songs}/>
    </div>
  )
}

export default Queue



export async function getServerSideProps() {
  return {props:{}};
}


