import React from 'react';
import GridListElement from './GridListElement';
import styles from "../../../../styles/List/GridList.module.scss"

const GridList = () => {
  return <div className={styles.gridListContainer}>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
      <GridListElement/>
  </div>;
};

export default GridList;
