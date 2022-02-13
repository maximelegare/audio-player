import { atom } from "recoil";


export const audioRefState = atom({
    key:"audioRefState",
    default:null
})


export const currentSongState = atom({
    key:"currentSongState",
    default:{}
})
