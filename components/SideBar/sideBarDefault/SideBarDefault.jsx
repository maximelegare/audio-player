import React from "react";

import { useRecoilState } from "recoil";
import { selectedSideBarProvider } from "../../../atoms/generalAtom";
import { searchSectionVisibilityState } from "../../../atoms/generalAtom";
import { useAudioPlayer } from "../../../hooks/AudioHooks";

import useSpotify from "../../../hooks/useSpotify";

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

import providers from "../../../lib/providersData.json";

import { SideBarScrollbar } from "./sideBarScrollbar/SideBarScrollbar";

export const SideBarDefault = () => {
  const { playlists } = useAudioPlayer();

  const { spotifyPlaylists } = useSpotify();

  const [provider, setSelectedProvider] = useRecoilState(
    selectedSideBarProvider
  );

  const { data: session } = useSession();

  const [searchVisibility, setSearchVisibility] = useRecoilState(
    searchSectionVisibilityState
  );

  const getPlaylists = (provider) => {
    switch (provider) {
      case "hodei": {
        return playlists;
      }
      case "spotify": {
        return spotifyPlaylists;
      }
    }
  };

  const getColor = (provier) => {
    switch (provider){
      case "hodei":{
        return "bg-[#5d1d91]"
      }
      case "spotify":{
        return "bg-[#3BD75F]"
      }
      default:{
        return "bg-[#2c0948]"
      }
    }
  }


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
          href="/home"
        />
        <SideBarLink
          icon={<MdPlaylistPlay className={styles.sideBarIcon} />}
          text="Queue"
          href="/queue"
        />
        <SideBarLink
          handleClick={() => setSearchVisibility(!searchVisibility)}
          icon={<BsSearch className={`${styles.sideBarIcon}`} />}
          text="Search"
          // dotsIcon
          // wholeButtonTrigger
          menuItem={<CustomInput placeHolder="Search Anything" />}
        />
      </div>
      <hr />
      <div className={`flex mt-3 gap-2`}>
        <div className={`w-[2px] h-full ${getColor(provider)}`}></div>
        <div className="flex-grow">
          <div className={styles.linkContainer}>
            <SideBarLink
              icon={<HiUserGroup className={styles.sideBarIcon} />}
              text="Artists"
              href={providers[provider].artists}
            />
            <SideBarLink
              icon={<BsDisc className={styles.sideBarIcon} />}
              text="Albums"
              href={providers[provider].albums}
            />
            <SideBarLink
              icon={<FaItunesNote className={styles.sideBarIcon} />}
              text="Songs"
              href={providers[provider].songs}
            />
          </div>
          <div className={styles.linkContainer}>
            <SideBarLink
              icon={<BsSuitHeart className={styles.sideBarIcon} />}
              text="Liked Songs"
              href={providers[provider].likedSongs}
            />
            <SideBarLink
              icon={<MdOutlinePlaylistAdd className={styles.sideBarIcon} />}
              text="New Playlist"
              wholeButtonTrigger
              dotsIcon
              menuItem={<PopOverInner buttonText="Create" playlistPopover />}
            />
          </div>
        </div>
      </div>
      <SideBarScrollbar playlists={getPlaylists(provider)} />
    </>
  );
};
