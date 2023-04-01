import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const spotifyPlaylistsAtomState = atom({
    key:"spotifyPlaylistAtomState",
    default:null
})


export const spotifyCurrentPlaylistAtomState = atom({
    key:"spotifyPlaylistAtomState",
    default:null
})
