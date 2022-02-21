import React from "react";
import styles from "../../styles/SideBar/SideBar.module.scss";
import SideBarLink from "./SideBarLink";

import { FaItunesNote } from "react-icons/fa";
import { BsDisc, BsSearch } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

import { MdOutlinePlaylistAdd, MdPlaylistPlay } from "react-icons/md";

import { AiOutlineHome } from "react-icons/ai";

import { Scrollbar } from "react-scrollbars-custom";

import FileInput from "../_Core/FileInput";

import logo from "../../public/assets/SVG/hodei-logo-white.svg";

import Image from "next/image";

import { useRecoilValue } from "recoil";
import { customPlaylistsState } from "../../atoms/audioAtom";

import CustomModal from "../_Core/CustomModal";

const SideBar = () => {
  const playlists = useRecoilValue(customPlaylistsState);

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
        <hr />
      </div>
      <div className={styles.scollbarContainer}>
        <div className={styles.linkContainer}>
          <div>
            <SideBarLink
              icon={<MdOutlinePlaylistAdd className={styles.icon} />}
              text="New Playlist"
            />
            
          </div>
          <SideBarLink
            icon={<MdPlaylistPlay className={styles.icon} />}
            text="Current Playlist"
            href="/current-playlist"
          />
        </div>
        <Scrollbar noScrollX style={{ width: "100%", height: "100%" }}>
          <div className={styles.linkContainer}>
            {playlists.map(({ id, title, route }) => (
              <SideBarLink key={id} text={title} href={route} />
            ))}
          </div>
        </Scrollbar>
        
      </div>
    </div>
  );
};

export default SideBar;
