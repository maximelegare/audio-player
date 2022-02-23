import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import styles from "../../../styles/_Core/PopOver.module.scss";

import { IoIosArrowForward } from "react-icons/io";

import DropdownItemWithIcon from "./DropdownItemWithIcon";

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
