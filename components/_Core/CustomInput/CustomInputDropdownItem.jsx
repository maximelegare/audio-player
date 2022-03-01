import React from "react";
import styles from "../../../styles/_Core/CustomInput.module.scss";

import CustomImage from "../CustomImage";

const CustomInputDropdownItem = ({ title, src }) => {
  return (
    <div className={styles.CustomInputDropdownItem}>
      <CustomImage src={src} width={35} height={35} />
      <div className={styles.text}>{title}</div>
    </div>
  );
};

export default CustomInputDropdownItem;
