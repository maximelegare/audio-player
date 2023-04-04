import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

import { If, Then, Else, When } from "react-if";

import providerDotStyles from "../../styles/_Core/providerDot.module.scss";
import Dropdown from "../../components/_Core/DropdownMenu/DropownMenu";
import { DropdownPlaylist } from "../_Core/DropdownMenu/DropdownPlaylist";
import SidePopOver from "../_Core/PopOver/PopOver";

import { useSetRecoilState } from "recoil";

const SideBarLink = ({
  icon,
  id,
  idx,
  text,
  href,
  iconOnly,
  wholeButtonTrigger,
  dotsIcon,
  menuItem,
  handleClick,
  fontWeight,
  variant,
  provider,
  onDropdownOpen,
}) => {
  const router = useRouter();

  const style = {
    color: router.asPath === href && "#fff0e8",
    opacity: router.asPath === href && 1,
  };

  const getText = (text) => {
    return `${text?.length > 20 ? `${text.slice(0, 20)} ...` : text}`;
  };

  const getColor = (provider) => {
    switch (provider) {
      case "hodei": {
        return "bg-hodeiAccent";
      }
      case "spotify": {
        return "bg-spotifyAccent";
      }
    }
  };

  const getButton = (variant) => {
    switch (variant) {
      case "label": {
        return (
          <div className={styles.container}>
            <When condition={icon}>
              <div className={styles.sideBarIcon}>{icon}</div>
            </When>

            <h4 className={`${styles.text} ${fontWeight}`}>
              {text && getText(text)}
            </h4>
          </div>
        );
      }
      case "link": {
        return (
          <Link passHref href={href}>
            <div className={styles.container} style={style}>
              <When condition={icon}>
                <div className={styles.sideBarIcon}>{icon}</div>
              </When>
              <h4 className={`${styles.text} ${fontWeight}`}>
                {text && getText(text)}
              </h4>
            </div>
          </Link>
        );
      }

      default: {
        return (
          <div className={styles.container} style={style} onClick={handleClick}>
            <When condition={icon}>
              <div className={styles.sideBarIcon}>{icon}</div>
            </When>

            <h4 className={`${styles.text} ${fontWeight}`}>{text && getText(text)}</h4>
          </div>
        );
      }
    }
  };

  return (
    <>
      <When condition={text || iconOnly}>
        <div className={styles.container}>
          <If condition={dotsIcon}>
            <Then>
              <>
                <div className="flex gap-1 items-center">
                  <When condition={provider}>
                    <div
                      className={`${providerDotStyles.dot} ${getColor(
                        provider
                      )}`}
                    ></div>
                  </When>
                  {getButton(variant)}
                </div>
                <Dropdown
                  menuItem={<DropdownPlaylist id={id} idx={idx} />}
                  onOpenChange={(isOpen) => {
                    onDropdownOpen(isOpen);
                  }}
                />
              </>
            </Then>
            <Else>{getButton(variant)}</Else>
          </If>
        </div>
      </When>
    </>
  );
};

export default SideBarLink;
