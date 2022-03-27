import React, { useEffect } from "react";

import styles from "../styles/HOC/withSpinner.module.scss";

const WithSpinner = (WrappedConponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return (
      <>
        {isLoading ? (
            <div className={styles.ldsEllipsis}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          
        ) : (
          <WrappedConponent {...otherProps} />
        )}
      </>
    );
  };

  return Spinner;
};

export default WithSpinner;
