// DropdownMenu Content displayed in the song RowListItem

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styles from "../../../styles/_Core/PopOver.module.scss";

import { IoIosArrowForward } from "react-icons/io";

import DropdownItemWithIcon from "./DropdownItemWithIcon";
import { useAudioPlayer } from "../../../hooks/AudioHooks";
import { useRouter } from "next/router";

const DropdownMenuSong = ({ song }) => {
  const { playlists, toggleSongFromQueue, addSongToPlaylist, toggleLikedSong } =
    useAudioPlayer();
  const router = useRouter();

  console.log(router)

  return (
    <>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => toggleSongFromQueue(song, router.pathname)}
      >
      {router.pathname === "/queue" ? "Remove From":  "Add to"} Queue
      </DropdownMenu.Item>

      <DropdownMenu.Separator>
        <hr />
      </DropdownMenu.Separator>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => router.push(`/${song.artist_route}`)}
      >
        Go to Artist
      </DropdownMenu.Item>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => router.push(`/${song.album_route}`)}
      >
        Go to Album
      </DropdownMenu.Item>
      <DropdownMenu.Separator>
        <hr />
      </DropdownMenu.Separator>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => toggleLikedSong(song.song_route, song.liked)}
      >
        {song.liked ? "Remove from" : "Add to"} liked Songs
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
          {playlists?.map(({ id, title, route }) => (
            <DropdownMenu.Item
              key={id}
              className={styles.menuItem}
              onClick={() => addSongToPlaylist(song.song_route, title)}
            >
              {title}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuSong;
