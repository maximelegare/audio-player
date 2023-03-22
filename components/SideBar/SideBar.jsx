import React, { useState } from "react";
import styles from "../../styles/SideBar/SideBar.module.scss";

import SideBarLink from "./SideBarLink";
import { Scrollbar } from "react-scrollbars-custom";
import PopOverInner from "../_Core/PopOver/PopOverInner";
import CustomInput from "../_Core/CustomInput/CustomInput";

import Image from "next/image";

import logo from "../../public/assets/SVG/hodei-logo-white.svg";

import hodeiSmall from "../../public/assets/SVG/hodei.svg";

import { FaItunesNote } from "react-icons/fa";
import { BsDisc, BsSearch } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdOutlinePlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { AiOutlineHome, AiOutlineSync } from "react-icons/ai";
import { BsSuitHeart } from "react-icons/bs";
import { useAudioPlayer } from "../../hooks/AudioHooks";

import { useSetRecoilState } from "recoil";
import { currentRoutePlaylistTitleState } from "../../atoms/audioAtom";
import { searchSectionVisibilityState } from "../../atoms/visibilityAtom";
import { useRecoilState } from "recoil";
import CustomButton from "../_Core/CustomButton";
import { signIn } from "next-auth/react";
import spotify from "../../public/assets/SVG/spotify.svg";

const SideBar = () => {
  const { playlists } = useAudioPlayer();
  const setCurrentRoutePlaylistState = useSetRecoilState(
    currentRoutePlaylistTitleState
  );

  const [searchVisibility, setSearchVisibility] = useRecoilState(
    searchSectionVisibilityState
  );

  const [isSynching, setIsSynching] = useState(false);

  const handleSyncButton = async () => {
    setIsSynching(true);
    const res = await fetch("/api/sync");
    const resData = await res.json();
    console.log(resData);
    setIsSynching(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Image src={logo} width={100} height={50} alt="" />
      </div>
      <hr />
      <div className={styles.linkContainer}>
        <div className="flex items-center gap-4">
          <CustomButton variant="iconOnly" underline>
            <div className="flex items-center">
              <Image src={hodeiSmall} width={25} height={25} alt="" />
            </div>
          </CustomButton>
          <CustomButton
            variant="iconOnly"
            handleClick={(e) => {
              e.preventDefault();
              signIn("spotify", { callbackUrl: "/" });
            }}
          >
            <div className="flex items-center">
              <Image src={spotify} width={25} height={25} alt="" />
              <div>+</div>
            </div>
          </CustomButton>
        </div>
      </div>
      <hr />
      <div className={styles.linkContainer}>
        <SideBarLink
          icon={
            <AiOutlineSync
              className={`${styles.sideBarIcon} ${isSynching && styles.rotate}`}
            />
          }
          text="sync"
          wholeButtonTrigger
          dotsIcon
          menuItem={
            <PopOverInner
              buttonText="Confirm"
              text="Are you sure you want to Synchronize?"
              handleSync={handleSyncButton}
              disableButton={isSynching}
            />
          }
        />
        <div className={styles.linkContainer}>
          <SideBarLink
            icon={<AiOutlineHome className={styles.sideBarIcon} />}
            text="Home"
            href="/"
          />
          <SideBarLink
            handleClick={() => setSearchVisibility(!searchVisibility)}
            icon={<BsSearch className={styles.sideBarIcon} />}
            text="Search"
            // dotsIcon
            // wholeButtonTrigger
            menuItem={<CustomInput placeHolder="Search Anything" />}
          />
        </div>
        <div className={styles.linkContainer}>
          <SideBarLink
            icon={<HiUserGroup className={styles.sideBarIcon} />}
            text="Artists"
            href="/artists"
          />
          <SideBarLink
            icon={<BsDisc className={styles.sideBarIcon} />}
            text="Albums"
            href="/albums"
          />
          <SideBarLink
            icon={<FaItunesNote className={styles.sideBarIcon} />}
            text="Songs"
            href="/songs"
          />
        </div>
      </div>
      <hr />

      <div className={styles.linkContainer}>
        <SideBarLink
          icon={<BsSuitHeart className={styles.sideBarIcon} />}
          text="Liked Songs"
          href="/liked-songs"
        />
        <SideBarLink
          icon={<MdPlaylistPlay className={styles.sideBarIcon} />}
          text="Queue"
          href="/queue"
        />
        <SideBarLink
          icon={<MdOutlinePlaylistAdd className={styles.sideBarIcon} />}
          text="New Playlist"
          wholeButtonTrigger
          dotsIcon
          menuItem={<PopOverInner buttonText="Create" playlistPopover />}
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
