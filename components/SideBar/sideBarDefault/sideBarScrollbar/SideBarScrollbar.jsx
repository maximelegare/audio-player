import React, { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import SideBarLink from "../../SideBarLink";
import styles from "../../../../styles/SideBar/SideBarScrollbar.module.scss";
import { useRecoilValue } from "recoil";
import { selectedSideBarProvider } from "../../../../atoms/generalAtom";
import CustomButton from "../../../_Core/CustomButton";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

import { IoIosCloseCircle } from "react-icons/io";

export const SideBarScrollbar = ({
  playlists,
  extendPlaylistSection,
  isplaylistExtended,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const setFilter = (value) => {
    setSelectedFilter(value);
  };

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
              By You
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
              By Spotify
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
                By You
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
                By Spotify
              </CustomButton>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className={styles.scrollbarContainer}>
      <div className={styles.buttonsSection}>
        <div className="flex items-center">
          <div className="flex">
            {selectedFilter === "liked" && (
              <CustomButton
                handleClick={() =>""}
                variant="iconOnly"
              >
                <IoIosCloseCircle />
              </CustomButton>
            )}
            <CustomButton
              handleClick={() => ""}
              variant="textOutline"
            >
              Liked
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
      <Scrollbar
        noScrollX
        style={{ marginTop: "8px", height: "100%", width: "100%" }}
      >
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
            ?.map((item) => {
              if (provider === "spotify") {
                return (
                  <SideBarLink
                    key={item.id}
                    text={item.name}
                    href={`/sp/playlists/${item.id}`}
                  />
                );
              } else {
                return (
                  <SideBarLink
                    key={item.id}
                    text={item.title}
                    href={item.route}
                  />
                );
              }
            })}
        </div>
      </Scrollbar>
    </div>
  );
};
