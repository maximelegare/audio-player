import React from "react";
import styles from "../../styles/SideBar/SideBarLink.module.scss";
const SideBarLink = ({ icon, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default SideBarLink;
