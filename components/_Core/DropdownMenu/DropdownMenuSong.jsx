import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styles from "../../../styles/_Core/PopOver.module.scss";

import { IoIosArrowForward } from "react-icons/io";

import DropdownItemWithIcon from "./DropdownItemWithIcon";
import { useAudioPlayer } from "../../../hooks/AudioHooks";
import { useRouter } from "next/router";

const DropdownMenuSong = ({ song }) => {
  const { playlists, addSongToQueue } = useAudioPlayer();
  const router = useRouter();

  return (
    <>
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => addSongToQueue(song)}
      >
        Add to Queue
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
      <DropdownMenu.Item className={styles.menuItem}>
        Add To liked Songs
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
            <DropdownMenu.Item key={id} className={styles.menuItem}>
              {title}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuSong;
