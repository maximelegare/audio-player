import React from "react";

import styles from "../../styles/Layout.module.scss";

const PageLayout = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default PageLayout;
