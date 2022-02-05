import React from "react";
import styles from "../../styles/SideBar/SideBar.module.scss";
import SideBarLink from "./SideBarLink";

import { FaItunesNote } from "react-icons/fa";
import { BsDisc, BsSearch } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

import { MdOutlinePlaylistAdd } from "react-icons/md";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <div>
        <SideBarLink
          icon={<BsSearch className={styles.icon} />}
          text="Search"
        />
        <SideBarLink
          icon={<MdOutlinePlaylistAdd className={styles.icon} />}
          text="New Playlists"
        />
      </div>
      <div>
        <SideBarLink
          icon={<FaItunesNote className={styles.icon} />}
          text="Artist"
        />
        <SideBarLink icon={<BsDisc className={styles.icon} />} text="Songs" />
        <SideBarLink
          icon={<HiUserGroup className={styles.icon} />}
          text="Albums"
        />
      </div>
      <div></div>
    </div>
  );
};

export default SideBar;
