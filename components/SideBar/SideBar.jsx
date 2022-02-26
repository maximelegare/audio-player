import React, { useEffect, useState } from "react";
import styles from "../../styles/SideBar/SideBar.module.scss";

import SideBarLink from "./SideBarLink";
import { Scrollbar } from "react-scrollbars-custom";
import FileInput from "../_Core/FileInput";
import NewPlaylist from "../_Core/PopOver/PopoverPlaylist";
import CustomInput from "../_Core/CustomInput";

import Image from "next/image";

import logo from "../../public/assets/SVG/hodei-logo-white.svg";

import { FaItunesNote } from "react-icons/fa";
import { BsDisc, BsSearch } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlinePlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsSuitHeart } from "react-icons/bs";
import { useAudioPlayer } from "../../hooks/AudioHooks";

import { useSetRecoilState } from "recoil";
import { currentRoutePlaylistTitleState } from "../../atoms/audioAtom";

const SideBar = () => {
  const { playlists } = useAudioPlayer();
  const setCurrentRoutePlaylistState = useSetRecoilState(currentRoutePlaylistTitleState)


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
            // dotsIcon
            // wholeButtonTrigger
            // menuItem={<CustomInput placeHolder="Search Anything" />}
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

      <div className={styles.linkContainer}>
        <SideBarLink
          icon={<BsSuitHeart className={styles.icon} />}
          text="Liked Songs"
          href="/liked-songs"
        />
        <SideBarLink
          icon={<MdPlaylistPlay className={styles.icon} />}
          text="Queue"
          href="/queue"
        />
        <SideBarLink
          icon={<MdOutlinePlaylistAdd className={styles.icon} />}
          text="New Playlist"
          wholeButtonTrigger
          dotsIcon
          menuItem={<NewPlaylist />}
        />
      </div>
      <div className={styles.scrollbarContainer}>
        <Scrollbar noScrollX style={{ height: "100%", width: "100%" }}>
          <div className={styles.linkContainer}>
            {playlists?.map(({ id, title, route }) => (
                <SideBarLink key={id} text={title} href={route} />
            ))}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
};

export default SideBar;
