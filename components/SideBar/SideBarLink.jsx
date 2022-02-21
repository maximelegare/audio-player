import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

import SideDropdownMenu from "../_Core/CustomModal";

import { BiDotsVerticalRounded } from "react-icons/bi";

const SideBarLink = ({ icon, text, href }) => {
  const router = useRouter();

  const style = {
    color: router.asPath === href && "#fff0e8",
    opacity: router.asPath === href && 1,
  };

  return (
    <div>
      {href ? (
        <Link passHref href={href}>
          <div className={styles.container} style={style}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.text}>{text}</div>
          </div>
        </Link>
      ) : (
        <div className={styles.container}>
          <SideDropdownMenu>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.text}>{text}</div>
            <div className={styles.menuIconContainer}>
              <BiDotsVerticalRounded className={styles.icon} />
            </div>
          </SideDropdownMenu>
        </div>
      )}
    </div>
  );
};

export default SideBarLink;
