import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "../../../styles/_Core/PopOver.module.scss";

import { FaTrashAlt } from "react-icons/fa";

import useSpotify from "../../../hooks/useSpotify";
import { useRouter } from "next/router";


export const DropdownPlaylist = ({id, idx}) => {

  const { deleteOrUnfollowSpotifyPlaylist } = useSpotify()
  const router = useRouter()  

  // C:\Users\maxle\Desktop\audioPlayer\audio-player\components\_Core\DropdownMenu\DropdownPlaylist.jsx
  return (
    <>
      {/* <DropdownMenu.Item
        className={styles.menuItem}
        // onClick={() => router.push(`/sp/albums/${song.albumId}`)}
      >
        Create playlist
      </DropdownMenu.Item> */}
      <DropdownMenu.Item
        className={styles.menuItem}
        onClick={() => router.push(`/sp/playlists/${id}`)}
      >
        Go to playlist
      </DropdownMenu.Item>
      <DropdownMenu.Separator>
        <hr className="mb-2"/>
      </DropdownMenu.Separator>
      <DropdownMenu.Item
        className={`${styles.menuItem} flex justify-between items-center`}
        onClick={() => deleteOrUnfollowSpotifyPlaylist(id, idx)}
      >
        <h3>Delete playlist</h3>
        <FaTrashAlt className="text-xs"/>
      </DropdownMenu.Item>
    </>
  );
};
