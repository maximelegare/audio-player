import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const spotifyPlaylistsAtomState = atom({
    key:"spotifyPlaylistAtomState",
    default:null
})

export const spotifyCurrentPlaylistIdAtomState = atom({
    key:"spotifyCurrentPlaylistIdAtomState",
    default:"",
})

export const spotifyCurrentPlaylistAtomState = atom({
    key:"spotifyPlaylistAtomState",
    default:null
})
