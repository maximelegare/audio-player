import React from "react";

import { useRecoilState } from "recoil";
import { selectedSideBarProvider } from "../../../atoms/visibilityAtom";
import { searchSectionVisibilityState } from "../../../atoms/visibilityAtom";
import { useAudioPlayer } from "../../../hooks/AudioHooks";

import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";

import styles from "../../../styles/SideBar/SideBar.module.scss";

import CustomButton from "../../_Core/CustomButton";
import SideBarLink from "../SideBarLink";
import CustomInput from "../../_Core/CustomInput/CustomInput";
import PopOverInner from "../../_Core/PopOver/PopOverInner";

import Image from "next/image";
import hodeiSmallLogo from "../../../public/assets/SVG/hodei.svg";
import spotify from "../../../public/assets/SVG/spotify.svg";

import { AiOutlineHome, AiOutlineSync } from "react-icons/ai";
import { BsDisc, BsSearch, BsSuitHeart } from "react-icons/bs";
import { HiOutlineCog, HiUserGroup } from "react-icons/hi";
import { FaItunesNote } from "react-icons/fa";
import { MdOutlinePlaylistAdd, MdPlaylistPlay } from "react-icons/md";
import { Scrollbar } from "react-scrollbars-custom";

import sideBarLinks from "../../../lib/sidebarLinks.json";

export const SideBarDefault = () => {
  const { playlists } = useAudioPlayer();

  const [provider, setSelectedProvider] = useRecoilState(
    selectedSideBarProvider
  );

  const { data: session } = useSession();

  const [searchVisibility, setSearchVisibility] = useRecoilState(
    searchSectionVisibilityState
  );

  return (
    <>
      <div className={styles.linkContainer}>
        <div className="flex items-center gap-4">
          <CustomButton
            variant="iconOnly"
            underline={provider === "hodei"}
            handleClick={() => setSelectedProvider("hodei")}
          >
            <div className="flex items-center">
              <Image src={hodeiSmallLogo} width={25} height={25} alt="" />
            </div>
          </CustomButton>
          {session?.user ? (
            <CustomButton
              variant="iconOnly"
              handleClick={() => setSelectedProvider("spotify")}
              underline={provider === "spotify"}
            >
              <div className="flex items-center">
                <Image src={spotify} width={25} height={25} alt="" />
                {/* <div className="text-base">+</div> */}
              </div>
            </CustomButton>
          ) : (
            <CustomButton
              variant="iconOnly"
              handleClick={(e) => {
                e.preventDefault();
                signIn("spotify", { callbackUrl: "/" });
              }}
            >
              <div className="flex items-center">
                <Image src={spotify} width={25} height={25} alt="" />
                <div className="text-base">+</div>
              </div>
            </CustomButton>
          )}
        </div>
      </div>
      <hr />
      <div className={styles.linkContainer}>
        <SideBarLink
          icon={<AiOutlineHome className={styles.sideBarIcon} />}
          text="Home"
          href={sideBarLinks[provider].home}
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
      <hr />
      <div className={styles.linkContainer}>
        <SideBarLink
          icon={<HiUserGroup className={styles.sideBarIcon} />}
          text="Artists"
          href={sideBarLinks[provider].artists}
        />
        <SideBarLink
          icon={<BsDisc className={styles.sideBarIcon} />}
          text="Albums"
          href={sideBarLinks[provider].albums}
        />
        <SideBarLink
          icon={<FaItunesNote className={styles.sideBarIcon} />}
          text="Songs"
          href={sideBarLinks[provider].songs}
        />
      </div>
      <hr />

      <div className={styles.linkContainer}>
        <SideBarLink
          icon={<BsSuitHeart className={styles.sideBarIcon} />}
          text="Liked Songs"
          href={sideBarLinks[provider].likedSongs}
        />
        <SideBarLink
          icon={<MdPlaylistPlay className={styles.sideBarIcon} />}
          text="Queue"
          href={sideBarLinks[provider].queue}
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
      <div className="flex gap-2">
      </div>
    </>
  );
};
