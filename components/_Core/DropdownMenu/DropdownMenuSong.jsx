import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Box from "../Box";

import styles from "../../../styles/_Core/PopOver.module.scss";

import { IoIosArrowForward } from "react-icons/io";

const DropdownMenuSong = () => {
  return (
    <>
      <DropdownMenu.Item className={styles.menuItem}>
        Add to Queue
      </DropdownMenu.Item>
      <DropdownMenu.Separator>
        <hr />
      </DropdownMenu.Separator>
      <DropdownMenu.Item className={styles.menuItem}>
        Go to Artist
      </DropdownMenu.Item>
      <DropdownMenu.Item className={styles.menuItem}>
        Go to Album
      </DropdownMenu.Item>
      <DropdownMenu.Separator>
        <hr />
      </DropdownMenu.Separator>
      <DropdownMenu.Item className={styles.menuItem}>
        Add to Liked Songs
      </DropdownMenu.Item>

      <DropdownMenu.Root>
        <DropdownMenu.TriggerItem className={styles.menuItem}>
          Add to Playlist
            <IoIosArrowForward className={styles.rightArrow} />
        </DropdownMenu.TriggerItem>
        <DropdownMenu.Content
          sideOffset={5}
          alignOffset={-5}
          className={styles.menuContent}
        >
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.menuItem}>
            Add to Liked Songs
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default DropdownMenuSong;
