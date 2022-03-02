import React from "react";

import styles from "../../styles/Layout.module.scss";


const PageLayout = ({ children, variant }) => {

  const getLayout = (variant) => {
    switch (variant) {
      case "small" :{
        return styles.small
      }
      default :{
        return styles.default
      }
    }
  } 





  return <div className={`${styles.layout} ${getLayout(variant)}`}>{children}</div>;
};

export default PageLayout;
