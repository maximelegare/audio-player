import React from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styles from "../../../styles/_Core/PopOver.module.scss";

import { IoIosArrowForward } from "react-icons/io";

import DropdownItemWithIcon from "./DropdownItemWithIcon";
import { useRouter } from "next/router";

export const DropdownMenuSongSpotify = ({song}) => {
  const router = useRouter()  


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
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => ""}
      >
        {song.liked ? "Remove from SP" : "Add to SP"} liked Songs
      </DropdownMenu.Item>

      <DropdownMenu.Root>
        <DropdownMenu.TriggerItem
          className={styles.menuItem}
          style={{ display: "flex" }}
        >
          <DropdownItemWithIcon text="Add to SP Playlist">
            <IoIosArrowForward className={styles.rightArrow} />
          </DropdownItemWithIcon>
        </DropdownMenu.TriggerItem>
        <DropdownMenu.Content
          sideOffset={5}
          alignOffset={-7}
          className={styles.menuContent}
        >
          {/* {playlists?.map(({ id, title, route }) => (
            <DropdownMenu.Item
              key={id}
              className={styles.menuItem}
              onClick={() => addAndRemoveSongFromPlaylist("add", song, title)}
            >
              {title}
            </DropdownMenu.Item>
          ))} */}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {/* {router.pathname.includes("/sp/playlists") && (
        <DropdownMenu.Item
          className={styles.menuItem}
          onClick={() =>
            ""
          }
        >
          Remove from this playlist
        </DropdownMenu.Item>
      )} */}
    </>
  );
};
