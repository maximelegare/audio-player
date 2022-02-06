import React from "react";
import CenterHeader from "../_Partials/Header";
import styles from "../../styles/Header/Center.module.scss"


const Center = () => {
  return (
    <div className={styles.container}>
      <CenterHeader />
    </div>
  );
};

export default Center;
