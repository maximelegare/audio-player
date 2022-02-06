import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
import Link from "next/link";
const SideBarLink = ({ icon, text, link }) => {
  return (
    <div>
      {link ? (
        <Link passHref href={link}>
          <div className={styles.container}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.text}>{text}</div>
          </div>
        </Link>
      ) : (
        <div className={styles.container}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.text}>{text}</div>
        </div>
      )}
    </div>
  );
};

export default SideBarLink;
