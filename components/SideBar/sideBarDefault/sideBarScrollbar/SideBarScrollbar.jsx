import React, { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import SideBarLink from "../../SideBarLink";
import styles from "../../../../styles/SideBar/SideBarScrollbar.module.scss";

import { useRecoilValue } from "recoil";
import { selectedSideBarProvider } from "../../../../atoms/generalAtom";
import CustomButton from "../../../_Core/CustomButton";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlinePlaylistAdd } from "react-icons/md";

import PopOverInner from "../../../_Core/PopOver/PopOverInner";

import { IoIosCloseCircle, IoIosAdd } from "react-icons/io";
import DialogComponent from "../../../Dialog/Dialog";
import { NewPlaylistDialog } from "../../../Dialog/NewPlaylistDialog";

import useSpotify from "../../../../hooks/useSpotify";

import { useSetRecoilState } from "recoil";

export const SideBarScrollbar = ({
  playlists,
  extendPlaylistSection,
  isplaylistExtended,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const [noScrollY, setNoScrollY] = useState(false);

  const setFilter = (value) => {
    setSelectedFilter(value);
  };

  const { removeTrackFromPlaylistByPosition } = useSpotify();
  const provider = useRecoilValue(selectedSideBarProvider);

  const getButtons = (selectedFilter) => {
    switch (selectedFilter) {
      case "by-you": {
        return (
          <div className="flex">
            {selectedFilter === "by-you" && (
              <CustomButton
                handleClick={() => setFilter("")}
                variant="iconOnly"
              >
                <IoIosCloseCircle />
              </CustomButton>
            )}
            <CustomButton
              handleClick={() => setFilter("by-you")}
              variant="textOutline"
            >
              By&nbsp;You
            </CustomButton>
          </div>
        );
      }
      case "by-spotify": {
        return (
          <div className="flex">
            {selectedFilter === "by-spotify" && (
              <CustomButton
                handleClick={() => setFilter("")}
                variant="iconOnly"
              >
                <IoIosCloseCircle />
              </CustomButton>
            )}
            <CustomButton
              handleClick={() => setFilter("by-spotify")}
              variant="textOutline"
            >
              By&nbsp;Spotify
            </CustomButton>
          </div>
        );
      }
      default: {
        return (
          <>
            <div className="flex">
              {selectedFilter === "by-you" && (
                <CustomButton
                  handleClick={() => setFilter("")}
                  variant="iconOnly"
                >
                  <IoIosCloseCircle />
                </CustomButton>
              )}
              <CustomButton
                handleClick={() => setFilter("by-you")}
                variant="textOutline"
              >
                By&nbsp;You
              </CustomButton>
            </div>
            <div className="flex">
              {selectedFilter === "by-spotify" && (
                <CustomButton
                  handleClick={() => setFilter("")}
                  variant="iconOnly"
                >
                  <IoIosCloseCircle />
                </CustomButton>
              )}
              <CustomButton
                handleClick={() => setFilter("by-spotify")}
                variant="textOutline"
              >
                By&nbsp;Spotify
              </CustomButton>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className={styles.scrollbarContainer}>
      <div className="pt-1 bg-[#231b1b39] rounded-bl-md rounded-br-md">
        <div className="mb-3 flex justify-between">
          <SideBarLink
            icon={<MdOutlinePlaylistAdd className={styles.sideBarIcon} />}
            text="Playlists"
            variant="label"
            fontWeight={"font-semibold"}
          />

          <NewPlaylistDialog />
        </div>
        <div className={styles.buttonsSection}>
          <div className="flex items-center gap-1">
            <div className="flex">
              {selectedFilter === "Loved" && (
                <CustomButton handleClick={() => ""} variant="iconOnly">
                  <IoIosCloseCircle />
                </CustomButton>
              )}

              <CustomButton handleClick={() => ""} variant="textOutline">
                Loved
              </CustomButton>
            </div>
            {provider === "spotify" && getButtons(selectedFilter)}
          </div>

          <CustomButton handleClick={extendPlaylistSection} variant="iconOnly">
            {isplaylistExtended ? (
              <FaCaretDown className="text-lg" />
            ) : (
              <FaCaretUp className="text-lg" />
            )}
          </CustomButton>
        </div>
      </div>
      <Scrollbar
        noScrollX
        noScrollY={noScrollY}
        className="overflow-hidden"
        id="scrollBarSideBar"
        style={{
          marginTop: "8px",
          height: "100%",
          width: "100%",
        }}
      >
        <div style={{ marginRight: `${noScrollY ? "10px" : ""}` }}>
          <div className={styles.linkContainer}>
            {playlists
              ?.filter((playlist) => {
                if (selectedFilter === "by-you") {
                  return playlist.isUserPlaylist;
                } else if (selectedFilter === "by-spotify") {
                  return !playlist.isUserPlaylist;
                } else {
                  return playlist;
                }
              })
              ?.map((item, idx) => {
                if (provider === "spotify") {
                  return (
                    <div className="my-1" key={item.id}>
                      <SideBarLink
                        text={item.name}
                        id={item.id}
                        idx={idx}
                        href={`/sp/playlists/${item.id}`}
                        fontWeight={"font-light"}
                        variant="link"
                        dotsIcon
                        onDropdownOpen={(value) => setNoScrollY(value)}
                        provider={provider}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="my-1" key={item.id}>
                      <SideBarLink
                        id={item.id}
                        idx={idx}
                        text={item.title}
                        href={item.route}
                        variant="link"
                        fontWeight={"font-light"}
                        dotsIcon
                        onDropdownOpen={(value) => setNoScrollY(value)}
                        provider={provider}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};
