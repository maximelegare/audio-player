import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";

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
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.text}>{text}</div>
        </div>
      )}
    </div>
  );
};

export default SideBarLink;
