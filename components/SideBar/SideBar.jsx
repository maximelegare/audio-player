import React from "react";
import styles from "../../styles/SideBar/SideBar.module.scss";
import SideBarLink from "./SideBarLink";

import { FaItunesNote } from "react-icons/fa";
import { BsDisc, BsSearch } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

import { MdOutlinePlaylistAdd } from "react-icons/md";

import { AiOutlineHome } from "react-icons/ai";

import { Scrollbar } from "react-scrollbars-custom";

import FileInput from "../_Core/FileInput";

import logo from "../../public/assets/SVG/hodei-logo-white.svg";

import Image from "next/image";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.linkContainer}>
          <Image src={logo} width={100} height={50} alt="" />
          <hr />
        </div>

        <div className={styles.linkContainer}>
          <FileInput />
        </div>
        <div className={styles.linkContainer}>
          <SideBarLink
            icon={<AiOutlineHome className={styles.icon} />}
            text="Home"
            href="/"
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
            href="/artists"
          />
          <SideBarLink
            icon={<BsDisc className={styles.icon} />}
            text="Albums"
            href="/albums"
          />
          <SideBarLink
            icon={<FaItunesNote className={styles.icon} />}
            text="Songs"
            href="/songs"
          />
        </div>
      </div>
      <div className={styles.scollbarContainer}>
        <Scrollbar noScrollX style={{ width: "100%", height: "100%"  }}>
          <div className={styles.linkContainer}>
            <SideBarLink text="Artists" href="/artists" />
            <SideBarLink text="Albums" href="/albums" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
            <SideBarLink text="Songs" href="/songs" />
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default SideBar;
