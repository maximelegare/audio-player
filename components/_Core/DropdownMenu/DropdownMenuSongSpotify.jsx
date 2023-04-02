import React from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styles from "../../../styles/_Core/PopOver.module.scss";

import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import DropdownItemWithIcon from "./DropdownItemWithIcon";
import { useRouter } from "next/router";

import useSpotify from "../../../hooks/useSpotify";

import { useAudioPlayer } from "../../../hooks/AudioHooks";
import { useRecoilValue } from "recoil";
import { currentRouteInfosAtom } from "../../../atoms/generalAtom";

export const DropdownMenuSongSpotify = ({ song, idx }) => {
  const router = useRouter();
  const { playlists } = useAudioPlayer();

  const currentRouteInfos = useRecoilValue(currentRouteInfosAtom);

  const {
    spotifyPlaylists,
    addSongToSpotifyPlaylist,
    removeTrackFromPlaylistByPosition,
  } = useSpotify();

  return (
    <>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => toggleSongFromQueue(song, router.pathname)}
      >
        {router.pathname === "/queue" ? "Remove From" : "Add to"} Queue
      </DropdownMenu.Item>

      <DropdownMenu.Separator>
        <hr />
      </DropdownMenu.Separator>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => router.push(`/sp/artists/${song.artistId}`)}
      >
        Go to Artist
      </DropdownMenu.Item>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => router.push(`/sp/albums/${song.albumId}`)}
      >
        Go to Album
      </DropdownMenu.Item>
      <DropdownMenu.Separator>
        <hr />
      </DropdownMenu.Separator>
      <DropdownMenu.Item className={styles.menuItem} onClick={() => ""}>
        {song.liked ? "Remove from SP" : "Add to SP"} liked Songs
      </DropdownMenu.Item>

      <DropdownMenu.Root>
        <DropdownMenu.TriggerItem
          className={styles.menuItem}
          style={{ display: "flex" }}
        >
          <DropdownItemWithIcon text="Add to Playlist">
            <IoIosArrowForward className={styles.rightArrow} />
          </DropdownItemWithIcon>
        </DropdownMenu.TriggerItem>
        <DropdownMenu.Content
          sideOffset={5}
          alignOffset={-7}
          className={styles.menuContent}
        >
          <DropdownMenu.Label className={styles.label}>
            Hodei :
          </DropdownMenu.Label>
          {playlists?.map(({ id, title }) => (
            <DropdownMenu.Item
              key={id}
              className={styles.menuItem}
              onClick={() => ""}
            >
              {title}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator>
            <hr />
          </DropdownMenu.Separator>
          <DropdownMenu.Label className={styles.label}>
            Spotify :
          </DropdownMenu.Label>
          {spotifyPlaylists
            ?.filter((playlist) => {
              return playlist.isUserPlaylist;
            })
            .map(({ id, name }) => {
              return (
                <DropdownMenu.Item
                  key={id}
                  className={styles.menuItem}
                  onClick={() =>
                    addSongToSpotifyPlaylist(id, [song.uri])
                  }
                >
                  {name}
                </DropdownMenu.Item>
              );
            })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {router.pathname.includes("/sp/playlists") &&
        currentRouteInfos.isUserPlaylist && (
          <DropdownMenu.Item
            className={styles.menuItem}
            onClick={() =>
              removeTrackFromPlaylistByPosition(
                currentRouteInfos.playlistId,
                song.id,
                idx,
                currentRouteInfos.playlistSnapshotId
              )
            }
          >
            Remove from this playlist
          </DropdownMenu.Item>
        )}
    </>
  );
};
