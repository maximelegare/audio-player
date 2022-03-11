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

export const highlightedSongState = atom({
  key: "highlightedSongState",
  default: {},
});

export const queueState = atom({
  key: "queueState",
  default: { title: null, songs: [] },
  effects_UNSTABLE: [persistAtom],
});

export const randomQueueState = atom({
  key: "randomQueueState",
  default: { title: null, songs: [] },
  effects_UNSTABLE: [persistAtom],
});

export const customPlaylistsState = atom({
  key: "playlistsState",
  default: [],
});

export const currentRouteSongsState = atom({
  key: "currentRouteSongsState",
  default: [],
});

export const likedSongsPlaylistState = atom({
  key: "likedSongsPlaylistState",
  default: [],
});

export const currentRoutePlaylistTitleState = atom({
  key: "currentPlaylistTitle",
  default: "",
});

export const repeatState = atom({
  key: "repeatState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const randomState = atom({
  key: "randomState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
