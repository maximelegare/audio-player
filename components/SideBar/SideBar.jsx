import React from "react";
import styles from "../../styles/SideBar/SideBar.module.scss";
import SideBarLink from "./SideBarLink";

import { FaItunesNote } from "react-icons/fa";
import { BsDisc, BsSearch } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

import { MdOutlinePlaylistAdd } from "react-icons/md";

import { AiOutlineCloudUpload, AiOutlineHome } from "react-icons/ai";

import { Scrollbar } from "react-scrollbars-custom";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <Scrollbar style={{ width: "100%", height: "100%" }}>
        <div className={styles.linkContainer}>
          <SideBarLink
            icon={<AiOutlineCloudUpload className={styles.icon} />}
            text="Upload Songs"
          />
        </div>
        <div className={styles.linkContainer}>
          <SideBarLink
            icon={<AiOutlineHome className={styles.icon} />}
            text="Home"
            link="/"
          />
          <SideBarLink
            icon={<BsSearch className={styles.icon} />}
            text="Search"
          />
          <SideBarLink
            icon={<MdOutlinePlaylistAdd className={styles.icon} />}
            text="New Playlist"
          />
        </div>
        <div className={styles.linkContainer}>
          <SideBarLink
            icon={<HiUserGroup className={styles.icon} />}
            text="Artists"
            link="/artists"
          />
          <SideBarLink
            icon={<BsDisc className={styles.icon} />}
            text="Albums"
            link="/albums"
          />
          <SideBarLink
            icon={<FaItunesNote className={styles.icon} />}
            text="Songs"
            link="/songs"
          />
        </div>
      </Scrollbar>
    </div>
  );
};

export default SideBar;
