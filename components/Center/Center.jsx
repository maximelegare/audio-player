import React from "react";
import CenterHeader from "./CenterHeader";
import styles from "../../styles/Center/Center.module.scss"


const Center = () => {
  return (
    <div className={styles.container}>
      <CenterHeader />
    </div>
  );
};

export default Center;
