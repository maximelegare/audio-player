import { atom } from "recoil";


export const audioRefState = atom({
    key:"audioRefState",
    default:null
})

export const isPlayingState = atom({
    key:"isPlayinState",
    default:false
})    


export const currentSongState = atom({
    key:"currentSongState",
    default:{}
})

export const currentPlaylistState = atom({
    key:"currentPlaylistState",
    default:{}
})