import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();


export const isPlayingState = atom({
  key: "isPlayinState",
  default: false,
});

export const currentSongState = atom({
  key: "currentSongState",
  default: {},
  // effects_UNSTABLE: [persistAtom],
});

export const currentPlaylistState = atom({
  key: "currentPlaylistState",
  default: {},
  // effects_UNSTABLE: [persistAtom],
});

export const customPlaylistsState = atom({
  key: "playlistsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
